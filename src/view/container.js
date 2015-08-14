import React from 'react';
import ControlPanel from './control_panel';
import Movies from './movies';

let movies = [ {
  "title" : "180",
  "actor_1" : "Siddarth",
  "locations" : "555 Market St.",
  "release_year" : "2011",
  "production_company" : "SPI Cinemas",
  "actor_2" : "Nithya Menon",
  "writer" : "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ",
  "director" : "Jayendra",
  "actor_3" : "Priya Anand"
}
, {
  "title" : "24 Hours on Craigslist",
  "actor_1" : "Craig Newmark",
  "release_year" : "2005",
  "production_company" : "Yerba Buena Productions",
  "distributor" : "Zealot Pictures",
  "writer" : "N/A",
  "director" : "Michael Ferris Gibson"
}
, {
  "title" : "48 Hours",
  "actor_1" : "Nick Nolte",
  "release_year" : "1982",
  "production_company" : "Paramount Pictures",
  "distributor" : "Paramount Pictures",
  "actor_2" : "Eddie Murphy",
  "writer" : "Walter Hill",
  "director" : "Walter Hill"
}
, {
  "title" : "50 First Dates",
  "actor_1" : "Adam Sandler",
  "locations" : "Rainforest Café (145 Jefferson Street)",
  "release_year" : "2004",
  "production_company" : "Columbia Pictures Corporation",
  "distributor" : "Columbia Pictures",
  "actor_2" : "Drew Barrymore",
  "writer" : "George Wing",
  "director" : "Peter Segal",
  "actor_3" : "Rob Schneider"
}
, {
  "title" : "About a Boy",
  "actor_1" : "David Walton",
  "locations" : "Broderick from Fulton to McAlister",
  "release_year" : "2014",
  "production_company" : "NBC Studios",
  "distributor" : "National Broadcasting Company",
  "actor_2" : "Minnie Driver",
  "writer" : "Jason Katims",
  "director" : "Mark J. Kunerth"
}
, {
  "title" : "About a Boy",
  "actor_1" : "David Walton",
  "locations" : "Crissy Field",
  "release_year" : "2014",
  "production_company" : "NBC Studios",
  "distributor" : "National Broadcasting Company",
  "actor_2" : "Minnie Driver",
  "writer" : "Jason Katims",
  "director" : "Mark J. Kunerth"
}
, {
  "title" : "About a Boy",
  "actor_1" : "David Walton",
  "locations" : "Powell from Bush and Sutter",
  "release_year" : "2014",
  "production_company" : "NBC Studios",
  "distributor" : "National Broadcasting Company",
  "actor_2" : "Minnie Driver",
  "writer" : "Jason Katims",
  "director" : "Mark J. Kunerth"
}
, {
  "title" : "After the Thin Man",
  "actor_1" : "William Powell",
  "locations" : "Coit Tower",
  "fun_facts" : "The Tower was funded by a gift bequeathed by Lillie Hitchcock Coit, a socialite who reportedly liked to chase fires. Though the tower resembles a firehose nozzle, it was not designed this way.",
  "release_year" : "1936",
  "production_company" : "Metro-Goldwyn Mayer",
  "distributor" : "Metro-Goldwyn Mayer",
  "actor_2" : "Myrna Loy",
  "writer" : "Frances Goodrich",
  "director" : "W.S. Van Dyke",
  "actor_3" : "James Stewart"
}
, {
  "title" : "A Jitney Elopement",
  "actor_1" : "Charles Chaplin",
  "locations" : "20th and Folsom Streets",
  "release_year" : "1915",
  "production_company" : "The Essanay Film Manufacturing Company",
  "distributor" : "General Film Company",
  "writer" : "Charles Chaplin",
  "director" : "Charles Chaplin"
}
, {
  "title" : "A Jitney Elopement",
  "actor_1" : "Charles Chaplin",
  "locations" : "Golden Gate Park",
  "fun_facts" : "During San Francisco's Gold Rush era, the Park was part of an area designated as the \"Great Sand Waste\". ",
  "release_year" : "1915",
  "production_company" : "The Essanay Film Manufacturing Company",
  "distributor" : "General Film Company",
  "writer" : "Charles Chaplin",
  "director" : "Charles Chaplin"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Filbert St. from Jones to Mason",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Leavenworth from Filbert & Francisco St",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Chestnut St. from Larkin to Columbus",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Francisco St from Larkin to Polk",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Broadway from Mason to Taylor",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alcatraz",
  "actor_1" : "Sarah Jones",
  "locations" : "Taylor St. from Broadway to Filbert",
  "release_year" : "2012",
  "production_company" : "Bonanza Productions Inc.",
  "distributor" : "Warner Bros. Television",
  "actor_2" : "Elizabeth Sarnoff",
  "writer" : "Steven Lilien",
  "director" : "J.J. Abrams",
  "actor_3" : "Bryan Wynbrandt"
}
, {
  "title" : "Alexander's Ragtime Band",
  "actor_1" : "Tyrone Power",
  "locations" : "Cliff House (1090 Point Lobos Avenue)",
  "fun_facts" : "In 1887, the Cliff House was severely damaged when the schooner Parallel, abandoned and loaded with dynamite, ran aground on the rocks below.",
  "release_year" : "1938",
  "production_company" : "Twentieth Century Fox Film Corporation",
  "distributor" : "Twentieth Century Fox Film Corporation",
  "actor_2" : "Alice Faye",
  "writer" : "Kathryn Scola",
  "director" : "Henry King"
}
, {
  "title" : "Alexander's Ragtime Band",
  "actor_1" : "Tyrone Power",
  "locations" : "San Francisco Bay",
  "release_year" : "1938",
  "production_company" : "Twentieth Century Fox Film Corporation",
  "distributor" : "Twentieth Century Fox Film Corporation",
  "actor_2" : "Alice Faye",
  "writer" : "Kathryn Scola",
  "director" : "Henry King"
}
, {
  "title" : "Alexander's Ragtime Band",
  "actor_1" : "Tyrone Power",
  "locations" : "Fairmont Hotel (950 Mason Street, Nob Hill)",
  "fun_facts" : "In 1945 the Fairmont hosted the United Nations Conference on International Organization as delegates arrived to draft a charter for the organization. The U.S. Secretary of State, Edward Stettinus drafted the charter in the hotel's Garden Room.",
  "release_year" : "1938",
  "production_company" : "Twentieth Century Fox Film Corporation",
  "distributor" : "Twentieth Century Fox Film Corporation",
  "actor_2" : "Alice Faye",
  "writer" : "Kathryn Scola",
  "director" : "Henry King"
}
, {
  "title" : "All About Eve",
  "actor_1" : "Bette Davis",
  "locations" : "Curran Theater (445 Geary Street)",
  "fun_facts" : "Called the Shubert Theatre in the film. ",
  "release_year" : "1950",
  "production_company" : "Twentieth Century Fox Film Corp.",
  "distributor" : "Twentieth Century Fox Film Corp.",
  "actor_2" : "Anne Baxter",
  "writer" : "Joseph L. Mankiewicz",
  "director" : "Joseph L. Mankiewicz"
}
, {
  "title" : "American Graffiti",
  "actor_1" : "Richard Dryfuss",
  "locations" : "Mel's Drive-In (Corner of Van Ness & Mission Street, Mission District)",
  "fun_facts" : "This restaurant location was demolished; however another Mel's was reopened in 1986 on 3355 Geary Blvd. ",
  "release_year" : "1973",
  "production_company" : "Universal Pictures",
  "distributor" : "Universal Pictures'",
  "writer" : "George Lucas",
  "director" : "George Lucas"
}
, {
  "title" : "American Graffiti",
  "actor_1" : "Richard Dryfuss",
  "locations" : "3355 Geary Blvd.",
  "release_year" : "1973",
  "production_company" : "Universal Pictures",
  "distributor" : "Universal Pictures'",
  "writer" : "George Lucas",
  "director" : "George Lucas"
}]

export default React.createClass({
  render: function() {
    return <div className="container">
             <ControlPanel/>
             <Movies movies={movies}/>
           </div>;
  }
});
