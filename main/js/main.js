var divInProgress;
var divGallery;

function setup(){
  noCanvas();
  noLoop();
  divInProgress = select("#inProgress");
  divGallery = select("#gallery");

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/pubhtml',
                   callback: function(data, tabletop) {
                     divGallery.html("");
                     console.log(data);
                     var archivedProjects = [];
                     var inProgProjects = [];
                     var todoProjects = [];
                       for(let i=0,len=data.length;i<len;i++){
                         if(data[i].Archived=="TRUE"){
                           archivedProjects.push(data[i]);
                         }else{
                           if(data[i].hasOutline=="TRUE"){
                             inProgProjects.push(data[i]);
                           } else {
                             todoProjects.push(data[i]);
                           }
                         }
                       }
                       renderInProgress(inProgProjects);
                       renderThumbnails(archivedProjects);

                   },
                   simpleSheet: true } );
}

function renderInProgress(projList){
  for ( let i = 0, len=projList.length ; i < len ; i ++){
    let name = projList[i]['Project Name'];
    //item card
    let li = createElement('li');
    li.addClass('proj');

    //link
    let a = createElement('a',name);
    a.attribute('href',name);

    //adding to card
    a.parent(li);

    // adding card to div
    li.parent(divInProgress);

  }
}

function renderThumbnails(projList){
  for ( let i = 0, len=projList.length ; i < len ; i ++){
    let name = projList[i]['Project Name'];
    let desc = projList[i]['Project Description'];
    //card
    let randomBG = randomColor();
    let card = createElement('a');
    card.attribute('href','https://www.joncraven.com/kravenoffs_kollection/'+name);
    // card.attribute('href','https://kravenoff42.github.io/kravenoffs_kollection/'+name);
    // card.attribute('href','/'+name);
    card.addClass('thumbnail');
    card.style('background-color',randomBG);

    //content
    let pName = createElement('p', name);
    pName.style('font-weight', 'bold';);
    pName.parent(card);
    let pDesc = createElement('p', desc);
    pName1.parent(card);

    //adding to page
    card.parent(divGallery);


  }
}

function randomColor(dark){
  if(dark=='dark'){
    return random(["#c6002b","#1c9442b","#dfc100","#0062a8","#d56211",
      "#7110094","#b2d51c","#006060","#c69edf","#600000","#000060"]);
  }
  return random(["#e6194b","#3cb44b","#ffe119","#0082c8","#f58231",
    "#911eb4","#d2f53c","#008080","#e6beff","#800000","#000080"]);
}
