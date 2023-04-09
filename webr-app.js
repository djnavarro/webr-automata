// import the webr module and then run the code
import('https://webr.r-wasm.org/latest/webr.mjs').then(async ({WebR}) => {

    // the HTML element showing the grid
    let grid = document.getElementById("grid");

    // wait for the webR session to start
    const webr = new WebR();
    await webr.init();

    // read the script as a string, and evaluate it in R
    let automaton = fetch('automaton.R').then((response) => {return response.text()});
    await webr.evalR(await automaton);

    // initialise the grid string by calling automaton() with no input,
    // pull results into JS, and update the display
    let str_r = await webr.evalR('automaton()')
    let str_js = await str_r.toJs();
    grid.innerHTML = str_js.values;

    // function to update the state of the grid
    async function grid_update() {
        await webr.objs.globalEnv.bind('str', grid.innerHTML) // copy grid string to R
        let str_r = await webr.evalR('automaton(str)')        // evaluate R function
        let str_js = await str_r.toJs();                      // convert result to JS
        grid.innerHTML = str_js.values;                       // update grid string
    }

    // repeatedly call the update function
    while (true) {
        await grid_update();
    }
});
