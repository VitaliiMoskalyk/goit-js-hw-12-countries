export default function findFistNElemOfArray(array,n) {
    const arr = [];
                array.forEach((el) => arr.push(el.name));
    arr.splice(n);
    return arr;
}