// import the webr module and then run the code
import('https://webr.r-wasm.org/latest/webr.mjs').then(async ({WebR}) => {

    // the HTML element showing the grid
    let grid = document.getElementById("grid");

    // wait for the webR session to start
    const webr = new WebR();
    await webr.init();

    // read the R source code as a JS string
    let art_src = fetch('art.R').then((response) => {return response.text()});

    // evaluate the R source code, defining make_art() in the R environment
    await webr.evalR(await art_src);

    // initialise the state of the grid by calling make_art() with no input,
    // pull the output into JS, and use it to update the state of the grid
    let art_r = await webr.evalR('make_art()')
    let art_js = await art_r.toJs();
    grid.innerHTML = art_js.values;

    // function to update the state of the grid
    async function grid_update() {
        await webr.objs.globalEnv.bind('str', grid.innerHTML) // copy the grid string into R
        let art_r = await webr.evalR('make_art(str)')         // pass the string to make_art()
        let art_js = await art_r.toJs();                      // pull the output back to JS
        grid.innerHTML = art_js.values;                       // update the grid string
    }

    // repeatedly call the update function
    while (true) {
        await grid_update();
    }
});