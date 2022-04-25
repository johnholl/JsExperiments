
changing a ref will not trigger things like useEffect because useEffect will only check values at a rerender

requestAnimationFrame is a best-practice way of creating an animation loop. This can be done recursively. I have not figured out how to make this play nice with async/await though, and so the current solution is hacky (call requestAnimationFrame, then have an async sleep function afterwards). How can this be done in a non-recursive async/await declarative way?

something weird is happening when I change tabs --> this was because the list ref lref was being updated on the final recursion of requestAnimationFrame. This method must skip calls when the tab isn't active, so NO BUSINESS LOGIC SHOULD BE HANDLED IN IT!

Currently the exec loop is pretty hacky in how code is translated to what goes into exec. As a result, errors aren't always predicatable and a malicious (why would you be malicious? this is all executing on your own browser) or careless user can break things.

You can generate a random spanning tree using a Pruefer sequence. From here, create additional random edges to make a random graph. Unclear if this is "uniformly random", but suffices for experiment.

component doesnt seem to update when its props update...even when prop is used to initialize state. hmmm....