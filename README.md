# Matrix Challange

Rotate a given matrix from left to right.

###Input
The input will be a CSV file with the columns id and json. You can assume id
to be a string and json to be a string (JSON encoded data).
```json
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]”
```
###Output
The output should be a CSV-encoded series of rotated tables with the
columns id, json and is_valid. The latter is an indicator of whether or not
a given table is valid, if it is not, json should be an empty array.

```json
id,json,is_valid
1,"[4, 1, 2, 7, 5, 3, 8, 9, 6]",true
2,"[90, 40, 10, 20]",true
3,"[-5]",true
9,"[]",false
5,"[]",false
8,"[]",false
```


## Running
### first install 
```shell
npm install
```

## Running tests

This will run some unit test to rotate routine

```shell
npm test
```

## Running
This will run a default option write node output to stdout.

```shell
npm start
```
or this to redirect stdout to a file
```shell
node index.js input.csv > output.csv
```
