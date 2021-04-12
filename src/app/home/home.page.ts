import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonProgressBar } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, filter, map, pluck, switchMap, tap } from 'rxjs/operators';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    @ViewChild("loader") loader: IonProgressBar;

    public count: number = 1;

    public isVisible: boolean = false;
    public subject = new Subject<number>();


    constructor(private http: HttpClient) {
        this.subject.pipe(
            debounceTime(1000),
            tap(() => this.isVisible = true),
            distinctUntilChanged(),
            switchMap(x => this.http.get(`http://localhost:5000/weatherforecast?count=${x}`))
        ).subscribe(x => {
            this.isVisible = false;
            console.log(x)
        })
    }

    plus() {
        this.count++;
        this.subject.next(this.count);
    }

    minus() {
        this.count--;
        this.subject.next(this.count);
    }
}
