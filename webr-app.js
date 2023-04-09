// import the webr module and then run the code
import('https://webr.r-wasm.org/latest/webr.mjs').then(async ({WebR}) => {

    // the HTML element showing the grid
    let grid = document.getElementById("grid");

    // wait for the webR session to start
    const webr = new WebR();
    await webr.init();

    // read the script as a string, and evaluate it in R
    let automaton = await fetch('automaton.R');
    await webr.evalR(await automaton.text());

    // initialise the state of the grid
    let str = await webr.evalR('automaton()')
    grid.innerHTML = (await str.toJs()).values;

    // function to update the state of the grid
    async function grid_update() {
        await webr.objs.globalEnv.bind('str', grid.innerHTML)
        let str = await webr.evalR('automaton(str)')
        grid.innerHTML = (await str.toJs()).values;
    }

    // repeatedly call the update function
    while (true) {
        await grid_update();
    }
});
