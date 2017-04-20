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

---
## angular component

for make angular component, you can use scss for style. 
if you make [name].component.scss file, in metadata use [name].css

```
// app/app.component.scss
// app/app.component.ts
// app/app.component.html

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.ts',
    styleUrls: ['app/app.component.css'] // << use css file.(scss file compile to css file)
})

```
