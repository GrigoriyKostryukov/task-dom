import { createElement } from 'react';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let elemTemplate = `<${tag}>${content}</${tag}>`;
    for (let i = 0; i < count; ++i) {
        document.body.insertAdjacentHTML('beforeend', elemTemplate);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    return generateChildren(1, level, childrenCount);
}

function generateChildren(levelNumber, totalLevels, childrenCount) {
    let element = document.createElement('div');
    element.className = `item_${levelNumber}`;
    if (levelNumber < totalLevels) {
        for (let j = 0; j < childrenCount; ++j) {
            element.append(
                generateChildren(levelNumber + 1, totalLevels, childrenCount),
            );
        }
    }

    return element;
}

/* 
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let itemsToReplace = tree.getElementsByClassName('item_2');
    for (let item of itemsToReplace) {
        let newItem = document.createElement('section');
        newItem.innerHTML = item.innerHTML;
        newItem.className = item.className;
        item.replaceWith(newItem);
    }
    return tree;
}
