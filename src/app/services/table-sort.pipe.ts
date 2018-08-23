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

        if (sortConfig.type === this.constants.SORT_OPTIONS.title) {
          this.sortByQuestionTitle(array, arraySorting);
        }
        if (sortConfig.type === this.constants.SORT_OPTIONS.answer_count) {
          return this.sortByAnswersAmount(array, arraySorting);
        } else if (sortConfig.type === this.constants.SORT_OPTIONS.author) {
          return this.sortByAuthor(array, arraySorting);
        }
      }
      return array;
    } else {
      return [];
    }
  }

  sortByAuthor(array, arraySorting): IQuestion[] {
    return array.sort(
      (el1, el2) => {
        if (el1.owner.display_name.toLocaleLowerCase() > el2.owner.display_name.toLocaleLowerCase()) {
          return arraySorting.more;
        }
        if (el1.owner.display_name.toLocaleLowerCase() < el2.owner.display_name.toLocaleLowerCase()) {
          return arraySorting.less;
        }
        if (el1.owner.display_name.toLocaleLowerCase() === el2.owner.display_name.toLocaleLowerCase()) {
          return 0;
        }
      }
    );
  }

  sortByAnswersAmount(array, arraySorting): IQuestion[] {
    return array.sort(
      (el1, el2) => {
        if (el1.answer_count > el2.answer_count) {
          return arraySorting.more;
        }
        if (el1.answer_count < el2.answer_count) {
          return arraySorting.less;
        }
        if (el1.answer_count === el2.answer_count) {
          return 0;
        }
      }
    );
  }

  sortByQuestionTitle(array, arraySorting) {
    return array.sort(
      (el1, el2) => {
        if (el1.title.toLocaleLowerCase() > el2.title.toLocaleLowerCase()) {
          return arraySorting.more;
        }
        if (el1.title.toLocaleLowerCase() < el2.title.toLocaleLowerCase()) {
          return arraySorting.less;
        }
        if (el1.title.toLocaleLowerCase() === el2.title.toLocaleLowerCase()) {
          return 0;
        }
      }
    );
  }
}
