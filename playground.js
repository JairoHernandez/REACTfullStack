// Only works in recent new browsers. Likely wont work in IE9,10.
// write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function in ES2015.
// https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//     fetch('https://rallycoding.herokuapp.com/api/music_albums') // returns promise
//         // fetch operations returns res object. Inside it is a .json() that is called 
//         // and is another promise of its own that is resolved after the json is the 
//         // request is ready for us.
//         .then(res => res.json()) 
//         .then(json => console.log(json));
// }

// REFACTOR 1
// 1. Identify any function that use asynchronous code and prepend 'async' keyword.
// 2. Put 'await' keyword in front of statements awaiting a promse. You have to assing to vars.
// async function fetchAlbums() {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     const json = await res.json();
//     console.log(json);
// }


// REFACTOR 2 use arrow function(note spacea after 'async')
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json();
    console.log(json);
}

fetchAlbums();