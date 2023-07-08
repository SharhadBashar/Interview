React props -> used to pass variables from a parent component to a child component
  parent: <componentName propname = propvalue />
  child: props.propName
  you can pass component as a prop. they can be accessed using props.children
to show a component whe user < /> tags. to show variables we use {}


state

map state to props


componentName.defaultProps = {

}

event.preventdefault


actions have a type and payload

reducers are functions that do things depending on the type of the action thats passed in

store is a collection of reducers and action creators

Action creator which produces an Action, which is fed to dispatch, which forwards the action to the Reducer, which creates a new State