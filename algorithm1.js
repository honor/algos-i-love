'''
Last modified on August 25, 2013
@author: honor

This is a variant on the standard MergeSort Algorithm that quickly computes
the number of inversions in a given large array of unsorted numbers.

An inversion is defined as an ordered pair (i,j) of array indices of an array A,
such that i < j and A[i] > A[j].

This version assumes a large input file LargeSampleTextFile.txt
where the ith row of the file indicates the ith entry of the input array.
'''


#!/usr/bin/env node
var fs = require("fs");
var data = fs.readFileSync("LargeSampleTextFile.txt", "utf8");
var data1 = data.split("\r\n");
var data2 = convert_to_int(data1);

// The global 'total' variable will keep track of the number of inversions
var total = 0;

//DEBUG set up a test array
//var array = [1, 3, 4, 2, 5, 8, 7, 0, 12, 9, 6, 11, 10]

//DEBUG checking the input file
//console.log(data2.length);

var sortedArr = sort_and_count(data2);

//DEBUG
//console.log(sortedArr.length);
//console.log(sortedArr.slice(0,20));

//This is what I want to know. The value of total after running the algorithm.
console.log(total);

//More debug here
for (var i=1;i<sortedArr.length;i++) {
  if (sortedArr[i-1]>=sortedArr[i]) {
    i=sorterArr.length;
    console.log("error in sequence");
  }
}

//Some code for dumping results into another file
//var outfile = "myOutputFile.txt";
//var out = sortedArr;
//fs.writeFileSync(outfile, out);  
//console.log("Script: " + __filename + "\nWrote: " + out + "\nTo: " + outfile);

//Main divide and conquer function, which takes an array A and sorts all the numbers inside.
//This first bit divides a given array into two equal parts. After sorting each half,
//the merge_array call will put the two parts back together.
//Along the way, the global 'total' variable will be updated to keep a running count 
//of the inversions it encounters as it sorts.

function sort_and_count(A)
{
  var n = A.length

  if (n == 1)
  {
    return A;
  }
  else
  {
    var index1 = Math.round(n/2);
    var B = A.slice(0, index1);
    var C = A.slice(index1,n);
    var B = sort_and_count(B);
    var C = sort_and_count(C);
    return merge_array(B, C);
  }
};

//Helper to the merge_array function. Here is the meaty recursion part.

function submerge_array(B, C)
{
    var D = [];

    var j = 0;

    for (var i = 0; i < B.length; )
    {
     
      for (; j < C.length; )
      {
        if (i<B.length && B[i] < C[j])
        {
          D.push(B[i]);
          i++;
        }
        else
        {
          D.push(C[j]);      
          //The number of inversions detected while merging are added to the running count 
          total = total + (B.length - i);
          j++;
        }
      }

      if (i<B.length)
      {
        D.push(B[i]);
        i++;
      }
    }
  

  return D;
};

//The merge part of the algortihm

function merge_array(B, C)
{
  if (B == [])
  {
    return C;
  }
  else if (C == [])
  {
    return B;
  }
  else
  {
    return submerge_array(B, C);
  }
}

//Converts items in the input file to integers

function convert_to_int(x)
{
  var y = [];
  for (var i=0; i < x.length; i++)
  {
    if (x[i].length>0) 
    {
      y.push(parseFloat(x[i]));
    }
  }
  return y;
}

