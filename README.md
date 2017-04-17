# gulp with typescript & rollupjs for build


## build info setting
in buildinfo.json, setting dest folder name, rollup entry, dest file name etc...


example

```  
{
    "dest" : "dist",
    "rollupEntryFile" : "dist/index.js",
    "rollupDestFile" : "dist/bundles/index.umd.js",
    "rollupFormat" : "umd",
    "moduleName" : "index"
}
```
--- 

## running

for running this build task, running below command.

```
    $ npm run build // do not running uglify
    $ npm run build_prod // running uglify
```