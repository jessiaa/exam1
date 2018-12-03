function fun() {
    var sum = 0;
    for (var i = 0; i < 10; i++) {
        sum += i;
        console.log(i);
    }
    console.log(sum);
}
fun()