import {Pipe, PipeTransform} from '@angular/core';
import { Atgard } from 'src/app/model/atgard';

@Pipe({
    name: 'filtreraAtgarder',
    pure: true
})
export class filtreraAtgarderPipe implements PipeTransform {
    transform(input: Atgard[], filtreringsAlternativ: string) {
        var output: Atgard[] = [];
        if (filtreringsAlternativ === 'öppna') {
            for (var i = 0; i < input.length; i++) {
                if (input[i].statusKod === 'ÖPP') {
                    output.push(input[i]);
                }
            }
            return output;
        } else if (filtreringsAlternativ === 'stängda') {
            for (var i = 0; i < input.length; i++) {
                if (input[i].statusKod !== 'ÖPP') {
                    output.push(input[i]);
                }
            }
            return output;
        } else {
            return input;
        }
    }
}