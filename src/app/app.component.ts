/// <reference path="../../node_modules/@types/underscore/index.d.ts" />
/// <reference path="../../node_modules/rxjs/Rx.d.ts" />

import { Component, OnInit } from '@angular/core';
import _  from 'underscore';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit {
    constructor() { 
        // test for rollup-plugin-ignore
        _.isNumber(123);
        _.isArray([]);
        const obs = Observable.of(1);
    }
    ngOnInit() {}
}
