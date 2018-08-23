import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../entities/question';
import { ConstantsService } from './constants.service';

@Pipe({name: 'tableSort'})
export class TableSortPipe implements PipeTransform {
  constructor(private constants: ConstantsService) {}
  transform(array: IQuestion[], sortConfig: {type: string; order: string}): IQuestion[] {
    if (array && array.length) {
      if (sortConfig.type) {

        const arraySorting = {
          more: 1,
          less: -1,
          equal: 0
        };
        if (sortConfig.order === this.constants.SORT_DIRECTION.asc) {
          arraySorting.more = -1;
          arraySorting.less = 1;
        }

        if (sortConfig.type === this.constants.SORT_OPTIONS.title
          || sortConfig.type === this.constants.SORT_OPTIONS.answer_count) {
            return array.sort(
              (el1, el2) => {
                if (el1[sortConfig.type] > el2[sortConfig.type]) {
                  return arraySorting.more;
                }
                if (el1[sortConfig.type] < el2[sortConfig.type]) {
                  return arraySorting.less;
                }
                if (el1[sortConfig.type] === el2[sortConfig.type]) {
                  return 0;
                }
              }
            );
          } else if (sortConfig.type === this.constants.SORT_OPTIONS.author) {
            return array.sort(
              (el1, el2) => {
                if (el1.owner.display_name > el2.owner.display_name) {
                  return arraySorting.more;
                }
                if (el1.owner.display_name < el2.owner.display_name) {
                  return arraySorting.less;
                }
                if (el1.owner.display_name === el2.owner.display_name) {
                  return 0;
                }
              }
            );
          }
      }
      return array;
    } else {
      return [];
    }
  }
}
