'''
Last modified on August 25, 2013
@author: honor

This is an implementation of the Dijkstra Shortest-Path Algorithm on a given graph
and a source vertex s. It computes the shortest-path distances
between s and every other vertex of the graph.

This version assumes a large input file LargeSampleTextFile.txt
containing an adjacency list representation of an undirected weighted graph,
using 1 as the source vertex.

Each row consists of the node tuples that are adjacent to that particular vertex
along with the length of that edge. For example, the sixth row will have 6 as its first entry.
Subsequent entries in the sixth row, separated by tabs, would take the form "80,141"
indicating there is an edge between vertex 6 and vertex 80 that has length 141.
'''

#!/usr/bin/env node
var fs = require("fs");
var data = fs.readFileSync("LargeSampleTextFile.txt", "utf8");
var dataArr = retrieveData(data.split("\t\r\n"));

//DEBUG some vertices for which you might want to calculate shortest-path distances
//in the case where the source vertex is 1.
//checkNums = [7,37,59,82,99,115,133,165,188,197];
//var testArray = dij(dataArr, 1);
//var outArr=[];
//for (var i=0; i<checkNums.length;i++)
//{
//  outArr.push(testArray[checkNums[i]-1]);
//}
//console.log(outArr);

//DEBUG
//var testArr = [[1, [2,1], [3,4]], [2, [3,2], [4,6]], [3], [4, [3,3]]];
//var dataArr=testArr;

//Some code in case I want to print the results elsewhere
//var outfile = "my OutputFile.txt";
//var out = dataArr;
//fs.writeFileSync(outfile, out);  
//console.log("Script: " + __filename + "\nWrote: " + out + "\nTo: " + outfile);


//The main function dij takes a graph V and a source vertex s
function dij(V, s)
{
  //Keep track of touched and untouched vertices in an array 
  var X = new Array(V.length);
  //The array A keeps track of the computed shortest path distances for touched vertices
  var A = new Array(V.length);
  //Keep track of the number of vertices touched so far
  untouched_num=V.length;
  for (var i = 0; i < V.length; i++)
  {
    X[i] = 0;
    A[i] = 0;
  }

  //Keep track of all edges that are eligible for the next iteration
  //Meaning, they have a head that has been touched and a tail that has been untouched
  //Initialize so that only s has been touched.
  var E = [];
  updateValidEdgeArr(V, E, X, s);
  X[s-1]=1;
  untouched_num--;
 
  //As long as there are untouched vertices remaining, keep iterating
  //Each time you touch a new vertex, update the list of eligible edges
  //and mark the vertex as touched, and decrease the number of untouched edges by 1.
  while (untouched_num > 0)
  {
    new_v = findNewVertex(V,E,A,X);
    updateValidEdgeArr(V, E, X, new_v);
    X[new_v-1]=1;
    untouched_num--;
  }

  return A;
};

//Determines the next vertex on which the iteration step will be performed.
//V is the input graph, E is the list of eligible edges, X is the list of touched/untouched array elements
//and A keeps track of the computed shortest path distance for each vertex that has been touched.
function findNewVertex(V, E, A, X)
{
  var min_dij = 0;
  var min_i = -1;

  for (var i=0; i< E.length; i++)
  {
    //Dijksta "Greedy Criterion"
    var dij_num = A[ E[i][0]-1 ] + E[i][2];
    if (min_i == -1 || dij_num < min_dij)
    {
      min_dij = dij_num;
      min_i = i;
    }    
  }

  A[ E[min_i][1]-1 ] = min_dij;
  return E[min_i][1];
}

//Once a new vertex y is chosen, you update a running list of the edges E that are now eligible
//For the next iteration.  
function updateValidEdgeArr(V,E,X,y)
{
  for (var i=0; i < E.length; )
  {
    if (E[i][1] == y)
    {
      E.splice(i,1);
    }
    else
    {
      i++;
    }
  }
  
  for (var i=1; i < V[y-1].length; i++)
  {
    var tmpElem = V[y-1][i];
    if (X[ tmpElem[0]-1 ] ==0)
    {
      var newElem = [y, tmpElem[0], tmpElem[1]];
      E.push(newElem);
    } 
  } 
}

//A function to retrieve the adjacency list representation of a graph
//out of a large text file formatted as described at the top.

function retrieveData(data1)
{
  var dataArr = [];
  for (var i = 0; i < data1.length; i++)
  {
    if (data1[i].length > 0)
    {
      var tmpArr=data1[i].split("\t");
      tmpArr[0]=parseFloat(tmpArr[0]);

      for (var j = 1; j < tmpArr.length; j++)
      {
        tmpArr[j] = tmpArr[j].split(",");
        tmpArr[j][0] = parseFloat(tmpArr[j][0]);
        tmpArr[j][1] = parseFloat(tmpArr[j][1]);
      }

      dataArr.push(tmpArr);
    }
  }
  
  return dataArr;
}







