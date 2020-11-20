
// ---------------------------------------------------------
if(!window.states && (document. title == 'County')){
    console.log("Undefined");
    console.log(window.states);
    alert("Note: You will have to select a state again to proceed to statistics. Thankyou!");
    window.location.replace("index.html");
                  
} 

console.log(document. title);
let states = window.states;
console.log(states);
if (states === undefined)
    states = ['utah'];

loadData().then(data => {
    data.settings = {
        selectedCounties: [],
        activeYear: '2015',
        years: [1985,1990,1995,2000,2005,2010,2015],
        focusCounty: null
    }
    data.states = states;
    let that = this;
    console.log(data)

    function updateAll() {
        let xValue = d3.select('#dropdown_x').select('.dropdown-content').select('select').node().value;
        let yValue = d3.select('#dropdown_y').select('.dropdown-content').select('select').node().value;
        //let cValue = d3.select('#dropdown_c').select('.dropdown-content').select('select').node().value;
        scatterPlot.updatePlot(xValue, yValue, xValue);
        countyMap.updateMap();
        focusLines.updateFocus();
        focusLines.updateBars();

        scatterPlot.updateHighlightClick()
        countyMap.updateHighlightClick();
    }

    function updateAllLine() {
        let yValue = d3.select('#dropdown_y-line').select('.dropdown-content').select('select').node().value;
        //let cValue = d3.select('#dropdown_c').select('.dropdown-content').select('select').node().value;
        line1.updatePlot(yValue);
    }
    function updateAllLine2() {
        let yValue = d3.select('#dropdown_y-line2').select('.dropdown-content').select('select').node().value;
        //let cValue = d3.select('#dropdown_c').select('.dropdown-content').select('select').node().value;
        line2.updatePlot(yValue);
    }

    function buttonclick(){
        let countyname = [];
        for (let state of this.data.states){
            for (let countyID in this.data[state]){
                let county = this.data[state][countyID];
                countyname.push(county.name);
            }
        }

        //color list reference: https://jnnnnn.blogspot.com/2017/02/distinct-colours-2.html
        let color_scale = d3.scaleOrdinal().domain(countyname).range(["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a",
         "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae",
          "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9",
           "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", "#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", "#678275", "#c5a121", "#a978ba",
            "#ee534e", "#d24506", "#59c3fa", "#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", "#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf",
             "#d77cd1", "#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", "#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", "#bb59d8",
              "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", "#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0", "#20c773", "#8b696d", "#78762d",
               "#e154c6", "#40835f", "#d73656", "#1afd5c", "#c4f546", "#3d88d8", "#bd3896", "#1397a3", "#f940a5", "#66aeff", "#d097e7", "#fe6ef9", "#d86507", "#8b900a",
                "#d47270", "#e8ac48", "#cf7c97", "#cebb11", "#718a90", "#e78139", "#ff7463", "#bea1fd"]);
        if(this.colorclick){
            this.data.linecolor = [false,''];
            console.log(this.data);
            this.colorclick = false;
            countyMap.updateMap();
        }
        else{
            this.data.linecolor = [true,color_scale];
            this.colorclick = true;
            console.log("true");
            console.log(this.data);
            countyMap.updateMap();
        }
        
        
    }
    // Creates the view objects
    //const infoBox = new InfoBox(data);
    const countyMap = new CountyMap(data, updateAll);
    const scatterPlot = new ScatterPlot(data, updateAll);
    const focusLines = new FocusLines(data, updateAll);
    const line1 = new LinePlot(data,updateAllLine,buttonclick);
    const line2 = new LinePlot2(data,updateAllLine2);
    
    console.log("data line");
    line1.drawPlot();
    line1.updatePlot("precip");
    line2.drawPlot();
    line2.updatePlot("precip");
    scatterPlot.drawPlot();
    scatterPlot.drawYearBar();
    scatterPlot.updatePlot("precip", "temp", "precip");
    focusLines.drawPlot();
    focusLines.drawBars();
    focusLines.updateFocus();
    focusLines.updateBars();



    // here we load the map data
    async function drawMap() {
        let countyData = await d3.json('data/us_counties.json');
        let stateData = await d3.json('data/us_states.json');
        let dividedCounties = {};
        let codes = {};
        for (let state of stateData.features){
            codes[+state.properties.STATE] = state.properties.NAME.toLowerCase();
            dividedCounties[state.properties.NAME.toLowerCase()] = {
                features: [], 
                state_features: state, 
                type:'FeatureCollection'}
        }
        for (let county of countyData.features){
            let name = codes[+county.properties.STATE];
            dividedCounties[name].features.push(county);
        }
        countyMap.drawMap(dividedCounties);
    }
    drawMap();

    // This clears a selection by listening for a click
    //document.addEventListener("click", function (e) {
    //    updateCounty(null);
    //}, true);
});