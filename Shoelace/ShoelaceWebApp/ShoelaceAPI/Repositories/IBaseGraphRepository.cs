using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Shoelace.Models;

namespace Shoelace.Repositories
{
    /// <summary>
    /// Interface for the repo commands
    /// </summary>
    public interface IBaseGraphRepository
    {
        //Vertex
        ActionResult<T> Create<T>(T model, bool updateIfExists = true) where T : BaseGraphEntity, new();
        ActionResult<T> Read<T>(Guid id) where T : BaseGraphEntity, new();
        ActionResult<IEnumerable<T>> ReadEverything<T>() where T : BaseGraphEntity, new();
        ActionResult<IEnumerable<T>> Read<T>() where T : BaseGraphEntity, new();
        ActionResult<T> Update<T>(T model) where T : BaseGraphEntity, new();
        ActionResult Delete<T>(Guid id) where T : BaseGraphEntity, new();
        ActionResult AddSecurity(BaseGraphEntity parentModel, BaseGraphEntity relatedModel, int securityRelationship);

        //Edge
        Guid ReadEdge(Guid parentId, Guid childId);
        ActionResult CreateEdge(Guid parentId, Guid childId, string relationship);
        ActionResult UpdateEdge(Guid edgeId, string newRelationship);
        ActionResult DeleteEdge(Guid edgeId);

        //Get properties
        dynamic GetProperty(Guid nodeId, string property);
        List<Guid> Traverse(Guid nodeId, bool direction);
        List<Guid> GetChildNodes(Guid nodeId);
        
    }
}
