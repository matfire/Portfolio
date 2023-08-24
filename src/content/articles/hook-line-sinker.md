---
title: "Hook, line, and sinker"
publishDate: 2022-01-25
cuid: ckytwsg0f01n62vs18lyr91cu
slug: hook-line-and-sinker
cover: https://cdn.blog.matteogassend.com/hook-line-sinker-cover.webp
tags: 
- javascript
- reactjs
- beginners
- programming

---

Following up on the [Beginner's guide to React](https://blog.matteogassend.com/a-beginners-guide-to-react-the-evergreen-to-do-list-ckdvrrpt301kcids1deticm5c), this article will cover the basic "hooks" that React offers.

## What are hooks?

Hooks are a functionality introduced in React 16.8. They allow you to create stateful functional components.

![the hell?](https://media.giphy.com/media/N25nrRX4rsnkY/giphy.gif)

If that last phrase made you have the same reaction as Al here, then this article's for you!
Let me try to explain it this way. Before, if we wanted to have *state* in a component, we'd need to use a `class component` that would look something like this:
```js
export default class TodoList extends React.Component {
    state = {
        todos: []
    }

    render() {
        return (
            <ul>
                {this.state.todos.map(e => <li>{e}</li>)}
            </ul>
)
    }
}
```

But now there's no need to write something so long! With React hooks functional components can have state! Whereas before you would just use a functional component as a *stateless* one (where data comes from *props*, basically), you can now give *state* to those components. Let's take the previous example; using hooks, we can rewrite it like this:

```js
const TodoList = () => {
  const [todos] = useState([])
  return (
    <ul>
      {todos.map(e => <li>{e}</li>)}
    </ul>
  )
}

//Export the function here
```
*NB: I prefer to write functional components this way for readability, but you could also export the function directly.*

Is it just me or did that code become a bit more readable just now? If you're wondering about the `[todos]` part, I'll talk more about it in the next section. Speaking (or writing, such as it is) about that, let's dive into React hooks!

## UseState

the `useState` hook replaces the `state` in a class component. It is used to define part of a component's state. Why do I say part of? Because you can (and *should*) use `useState` multiple times in a single component. This allows you to have more control over the state and, when used in conjunction with the next hook (spoiler), will allow you to rerun code or rerender of your app on a specific state change.

Let's take the last bit of code and continue from there:

```js
const TodoList = () => {
  const [todos] = useState([])
  return (
    <ul>
      {todos.map(e => <li>{e}</li>)}
    </ul>
  )
}
```
At this moment, the component renders a list of *todos*, but you might notice a problem; we have no way to **set** those *todos*.

To do that, we need to understand the return values of `useState`: this function returns an array containing the state's value and a function to update said values. We can call it (and the value, for that matter) whatever we want, but let's stick to the conventions for now.
Let's update the code we've written before:

```js
const TodoList = () => {
  const [todos, setTodos] = useState([])
  return (
    <ul>
      {todos.map(e => <li>{e}</li>)}
    </ul>
  )
}
```

Now we have a function to set our todos. Let's add an input and a button to add todos. In the input, we'll listen to the `onChange` event to modify some other piece of state.

```js
const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  return (
    <div>
      <ul>
        {todos.map(e => <li>{e}</li>)}
      </ul>
      <input onChange={(e) => {setNewTodo(e.target.value)}} value={newTodo} />
      <button onClick={() => {
          setTodos((oldTodos) => [...oldTodos, newTodo])
          setNewTodo("")
      }}>
       Add Todo
     </button>
    </div>
  )
}
```
![woah woah woah](https://media.giphy.com/media/RXKCMLmch5W2Q/giphy.gif)

Yeah, that's a lot of new stuff to cover, I know. Let's break it down

```js
const [newTodo, setNewTodo] = useState("")
```
This is just a new useState. Notice how this time I put **""** as a first argument. The first argument in a useState function call defines the starting value of the state and is also used to determine its *type*. This can be used by us (the developers) to get IntelliSense on the state (autocompletion etc).

```js
<input onChange={(e) => {setNewTodo(e.target.value)}} value={newTodo} />
```
This input does two things: it reads the state *newTodo* and uses it as value while also updating it with its new value (when a user types in the input, the state will change to reflect that change).

```js
 <button onClick={() => {
   setTodos((oldTodos) => [...oldTodos, newTodo])
   setNewTodo("")
 }}>
  Add Todo
 </button>
```
This button add the *newTodo* to the list and resets the input's text (i.e. *newTodo*). You might have noticed something...
```js
   setTodos((oldTodos) => [...oldTodos, newTodo])
   setNewTodo("")
```

![different](https://media.giphy.com/media/IwX8XVO9mx3SmncyF5/giphy.gif)

When you *set* a state, you can either directly pass the new value as an argument, or use an arrow function to get a reference to the current state's value (useful for updating arrays).

And that's it for the useState hook !!

## useEffect

Now that we know how to set state in a component, let's see how to replace a `componentDidUpdate` using hooks. the `componentDidUpdate` method of a class component was used to trigger effects based on state and props change.

Let's say we're building a photo search app and we need to update the search results based on the current value of an input field. As the user types in the input field, we want to update the result. We could do it in the `onChange` callback, but that would make the rerender dependent on the onChange and the app would become laggy (at least it used to, don't quote me on that).

Let's setup our basic component:

```js
const PhotoSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [photoResult, setPhotoResult] = useState([])
    
    return (
        <div>
            <input
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}} 
            />
            <div>
                {photoResult.map((e) => (
                    <img src={e} />
                ))}
            </div>
        </div>
    )
}
```

So, nothing new for now; we have to states, searchValue and photoResult, the former to store the input's value and the second to store the photos matching that search. Now let's use the `useEffect` hook to update the photoResult array with our search results (here I'm using a basic example, a real API would have more complex data formats (like [unsplash](https://unsplash.com/developers))

```js
const PhotoSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [photoResult, setPhotoResult] = useState([])
    
    useEffect(() => {
        if (searchValue) {
            fetchImages(searchValue).then((data) => {
                setPhotoResult(data)
            })
        }
    }, [searchValue])

    return (
        <div>
            <input
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}} 
            />
            <div>
                {photoResult.map((e) => (
                    <img src={e} />
                ))}
            </div>
        </div>
    )
}
```
*NB: fetchImages acts as a function that returns an array of links to images from an API*

Let's break it down:

`useEffect` takes two arguments (the second being optional): the former is a callback function and the latter is a dependency array.
The callback function gets executed every time the values inside the dependency array change. In our example, we want to rerun that function each time the `searchValue` changes, so we add `searchValue` to the dependency array. Notice also the condition inside the callback:
```js
if (searchValue)
```
Since the value could be empty after a user deletes its input or when the page first loads, we need to check before executing a code that depends on it.

There are other quirks with useEffect, and you can read more about them on the [official React documentation](https://reactjs.org/docs/hooks-effect.html).

## Final words

These are just the two hooks you'll use the most. Others exist (useContext, useCallback, useMemo), and you can even make your own. We'll probably look at those another time, on another article, but let's stop here for the time being.