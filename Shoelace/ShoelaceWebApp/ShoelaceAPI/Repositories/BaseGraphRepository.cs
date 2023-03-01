using Gremlin.Net.Driver;
using Gremlin.Net.Driver.Remote;
using Gremlin.Net.Structure;
using Gremlin.Net.Structure.IO.GraphSON;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Shoelace.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Shoelace.Repositories
{
    /// <summary>
    /// Clinical Directory repository for Graph DB (Cosmos DB) using Gremlin language (Gremlin.Net)
    /// 
    /// LIMITATIONS
    /// Cosmos DB does not currently support Gremlin Bytecode, so the LINQ-style queries cannot be used (ex: g.V().hasLabel('study')..)
    /// See : https://stackoverflow.com/questions/49278344/gremlin-net-execute-queries-using-next-raises-nullreferenceexception
    /// Vote on : https://feedback.azure.com/forums/263030-azure-cosmos-db/suggestions/33632779-support-gremlin-bytecode-to-enable-the-fluent-api
    /// 
    /// Queries return data in GraphSON format, which can be converted to JSON through JSON.Net
    /// See : http://tinkerpop.apache.org/docs/current/reference/#graphson-reader-writer
    /// 
    /// Architecture Notes:
    ///  - Input validation (null, empty, etc.) should be performed on all arguments
    /// </summary>
    public class BaseGraphRepository : IBaseGraphRepository        
    {
        private readonly GremlinServer _graphServer = null;

        public BaseGraphRepository(IOptions<DirectorySettings> settings)
        {

            this._graphServer = this._graphServer ?? new GremlinServer(settings.Value.graphDbHostname, settings.Value.graphDbPort, enableSsl: true,
                                                    username: "/dbs/" + settings.Value.graphDatabase + "/colls/" + settings.Value.graphCollection,
                                                    password: settings.Value.graphDbAuthKey);
        }
        /***************************************************************** V E R T E X *****************************************************************/
        /// <summary>
        /// Creates a node
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <param name="updateIfExists"></param>
        /// <returns></returns>
        public ActionResult<T> Create<T>(T model, bool updateIfExists = true)
            where T : BaseGraphEntity, new()
        {
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                // Comments below are kept as reference for when GraphSON3 will work
                //var graph = new Graph();
                //var g = graph.Traversal().WithRemote(new DriverRemoteConnection(gremlinClient));
                //var r = g.V().AddV("study").Iterate();

                try
                {
                    if (model.Id == null || model.Id == Guid.Empty)
                    {
                        model.Id = Guid.NewGuid();
                    }

                    var task = gremlinClient.SubmitAsync<dynamic>("g.addV('" + model.Label + "')" + model.ToGremlinPropertyChain(true));
                    task.Wait();
                }
                catch (AggregateException e)
                {
                    if (updateIfExists)
                    {
                        Update(model);
                    }

                    // TODO : task.Result error handling
                }
            }
           
            return model;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public ActionResult<IEnumerable<T>> ReadEverything<T>()
            where T : BaseGraphEntity, new()
        {
            var models = new List<T>();

            var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType);
            {
                // Comments below are kept as reference for when GraphSON3 will work
                //var graph = new Graph();
                //var g = graph.Traversal().WithRemote(new DriverRemoteConnection(gremlinClient));
                //var r = g.V().HasLabel("study").Iterate();

                T temp = new T(); // Just to get the correct label
                var task = gremlinClient.SubmitAsync<dynamic>($"g.V()");
                task.Wait();

                foreach (var result in task.Result)
                {
                    T s = new T();
                    s.Load(new Guid(result["id"]), JObject.Parse(JsonConvert.SerializeObject(result["properties"])));
                    models.Add(s);
                }
            }

            return models;
        }
        /// <summary>
        /// Reads all node
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public ActionResult<IEnumerable<T>> Read<T>()
            where T : BaseGraphEntity, new()
        {
            var models = new List<T>();

            var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType);
            {
                // Comments below are kept as reference for when GraphSON3 will work
                //var graph = new Graph();
                //var g = graph.Traversal().WithRemote(new DriverRemoteConnection(gremlinClient));
                //var r = g.V().HasLabel("study").Iterate();

                T temp = new T(); // Just to get the correct label
                var task = gremlinClient.SubmitAsync<dynamic>($"g.V().hasLabel('{temp.Label}')");
                task.Wait();

                foreach (var result in task.Result)
                {
                    T s = new T();
                    s.Load(new Guid(result["id"]), JObject.Parse(JsonConvert.SerializeObject(result["properties"])));
                    models.Add(s);
                }
            }

            return models;
        }
        /// <summary>
        /// Reads a vertex
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult<T> Read<T>(Guid id)
            where T : BaseGraphEntity, new()
        {
            if (id == null || id == Guid.Empty)
            {
                return new NotFoundResult();
            }

            T model = new T();
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                var task = gremlinClient.SubmitAsync<dynamic>($"g.V().hasLabel('{model.Label}').hasId('{id}')");
                task.Wait();

                if (task.Result.Count > 0)
                {
                    var result = task.Result.FirstOrDefault();
                    model.Load(new Guid(result["id"]), JObject.Parse(JsonConvert.SerializeObject(result["properties"])));
                    return model;
                }
            }

            return new NotFoundResult();
        }

        /// <summary>
        /// Updates a node
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public ActionResult<T> Update<T>(T model)
            where T : BaseGraphEntity, new()
        {
            if (model == null || model.Id == null || model.Id == Guid.Empty)
            {
                return new BadRequestResult();
            }

            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                var task = gremlinClient.SubmitAsync<dynamic>($"g.V().hasLabel('{model.Label}').hasId('{model.Id}')" + model.ToGremlinPropertyChain(false));
                task.Wait();
            }

            return model;
        }

        /// <summary>
        /// deletes a node
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Delete<T>(Guid id)
            where T : BaseGraphEntity, new()
        {
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                T temp = new T(); // Just to get the correct label
                var task = gremlinClient.SubmitAsync<dynamic>($"g.V().hasLabel('{temp.Label}').hasId('{id}').drop()");
                task.Wait();

                if (task.Result.Count > 0)
                {
                    return new OkResult();
                }
            }

            return new NotFoundResult();
        }
        
        public ActionResult AddSecurity(BaseGraphEntity parentModel, BaseGraphEntity relatedModel, int securityRelationship)
        {
            throw new NotImplementedException();
        }

        /*****************************************************************************************************************************************/

        /**************************************************************** E D G E ****************************************************************/
        /// <summary>
        /// Reads an Edge ID
        /// </summary>
        /// <param name="parentId"></param>
        /// <param name="childId"></param>
        /// <returns></returns>
        public Guid ReadEdge(Guid parentId, Guid childId)
        {
            if (parentId == null || parentId == Guid.Empty || childId == null || childId == Guid.Empty)
            {
                return Guid.Empty;
            }

            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                List<string> parentIdsList = new List<string>();  
                var parentTest = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{parentId}').outE().Id()");
                parentTest.Wait();
                foreach (string id in parentTest.Result)
                {
                    parentIdsList.Add(id);
                }
                if ((parentIdsList.Count == 0))
                {
                    return Guid.Empty;
                }

                List<string> childIdsList = new List<string>();
                var childTest = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{childId}').inE().Id()");
                childTest.Wait();
                foreach (string id in childTest.Result)
                {
                    childIdsList.Add(id);
                }
                if ((childIdsList.Count == 0))
                {
                    return Guid.Empty;
                }
                var edge = gremlinClient.SubmitAsync<dynamic>($"g.E().hasId('{childId}').inE().Id()");
                var edgeId = parentIdsList.Where(item => childIdsList.Select(item2 => item2).Contains(item));

                try
                {
                    return Guid.Parse(edgeId.FirstOrDefault());
                }
                catch (System.ArgumentNullException)
                {
                    return Guid.Empty;
                }
                
            }
        }

        
        /// <summary>
        /// Creates an Edge
        /// </summary>
        /// <param name="parentID"></param>
        /// <param name="childID"></param>
        /// <param name="relationship"></param>
        /// <returns></returns>
        public ActionResult CreateEdge(Guid parentID, Guid childID, string relationship)
        {
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                //this will find the two verticies and add an edge between them
                if (parentID == null || childID == null || parentID == Guid.Empty || childID == Guid.Empty)
                {
                    return new BadRequestResult();
                }
                try
                {
                    var task = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{parentID}').addE('{relationship}').to(g.V().hasId('{childID}'))");
                    task.Wait();
                }
                catch (AggregateException e)
                {
                    // TODO : task.Result error handling
                }
            }

            return new OkResult();
        }
        
        /// <summary>
        /// Updates an Edge
        /// </summary>
        /// <param name="edgeID"></param>
        /// <param name="newRelationship"></param>
        /// <returns></returns>
        public ActionResult UpdateEdge(Guid edgeID, string newRelationship)
        {
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                //this will find the two verticies and add an edge between them
                if (edgeID == null || edgeID == Guid.Empty)
                {
                    return new NotFoundResult();
                }
                try
                {
                    var task = gremlinClient.SubmitAsync<dynamic>($"g.E().hasId('{edgeID}').property('label','{newRelationship}')");
                    task.Wait();
                }
                catch (AggregateException e)
                {
                    // TODO : task.Result error handling
                }
            }

            return new OkResult();
        }
        /// <summary>
        /// Deletes an Edge
        /// </summary>
        /// <param name="edgeID"></param>
        /// <returns></returns>
        public ActionResult DeleteEdge(Guid edgeID)
        {
            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                //this will find the two verticies and add an edge between them
                if (edgeID == null || edgeID == Guid.Empty)
                {
                    return new NotFoundResult();
                }
                try
                {
                    var task = gremlinClient.SubmitAsync<dynamic>($"g.E().hasId('{edgeID}').Drop()");
                    task.Wait();
                }
                catch (AggregateException e)
                {
                    // TODO : task.Result error handling
                }
            }

            return new OkResult();
        }
        /*****************************************************************************************************************************************/

        /*********************************************************** GET FROM GRAPH ***********************************************************/
        /// <summary>
        /// Gets a properties from a node
        /// </summary>
        /// <param name="nodeId"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        public dynamic GetProperty(Guid nodeId, string property)
        {
            if (nodeId == null || nodeId == Guid.Empty)
            {
                return null;
            }

            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                var propertyValue = gremlinClient.SubmitAsync<dynamic>($"g.V().hasid('{nodeId}').properties('{property}').value()");
                propertyValue.Wait();
                return propertyValue.Result.ElementAt(0);
            }
        }

        /// <summary>
        /// Transvers up or down from  a node. 0 is up, 1 is down
        /// </summary>
        /// <param name="nodeId"></param>
        /// <param name="direction"></param>
        /// <returns></returns>
        public List<Guid> Traverse(Guid nodeId, bool direction)
        {
            if (nodeId == null || nodeId == Guid.Empty)
            {
                return null;
            }

            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                List<Guid> idsList = new List<Guid>();
              
                    if (direction.Equals(false))
                    {
                        var ids = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{nodeId}').inE().outV().Id()");
                        ids.Wait();
                        foreach (String id in ids.Result)
                        {
                            idsList.Add(Guid.Parse(id));
                        }
                    }

                    else if (direction.Equals(true))
                    {
                        var ids = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{nodeId}').outE().inV().Id()");
                        ids.Wait();
                        foreach (string id in ids.Result)
                        {
                            idsList.Add(Guid.Parse(id));
                        }
                    }
                return idsList;
            }
        }

        /// <summary>
        /// Gets all child nodes of a node that is not a document
        /// </summary>
        /// <param name="nodeId"></param>
        /// <returns></returns>
        public List<Guid> GetChildNodes(Guid nodeId)
        {
            if (nodeId == null || nodeId == Guid.Empty)
            {
                return null;
            }

            using (var gremlinClient = new GremlinClient(this._graphServer, new GraphSON2Reader(), new GraphSON2Writer(), GremlinClient.GraphSON2MimeType))
            {
                List<Guid> idsList = new List<Guid>();
                {
                    var childNodes = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{nodeId}').outE().inV().id()");
                    childNodes.Wait();
                    foreach (string id in childNodes.Result)
                    {
                        var nodeType = gremlinClient.SubmitAsync<dynamic>($"g.V().hasId('{id}').Label()");
                        if (nodeType.Result.ElementAt(0) != "document")
                        {
                            idsList.Add(Guid.Parse(id));
                        }
                    }
                }
                return idsList;
            }
        }
    }
}