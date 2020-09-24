// // 柯里化测试
// function add() {
// 	// 第一次执行时，定义一个数组专门用来存储所有的参数
// 	var _args = Array.prototype.slice.call(arguments);
// 	// 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
// 	var _adder = function() {
// 		_args.push(...arguments);
// 	console.log(_adder);
// 			return _adder;
// 	};

// 	// 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
// 	_adder = function () {
// 			return _args.reduce(function (a, b) {
// 					return a + b;
// 			});
// 	}
// 	return _adder;
// }

// add(1, 2, 3)(2)        
// add(1, 2, 3)(4)             
// add(1)(2)(3)(4)(5)          
// add(2, 6)(1)               
let add = (...args) => {
	let f = (...newArgs) => add(...[...args, ...newArgs])
	console.log(f);
	f.toString = () => args.reduce((a, b) => a + b)
	return f
	}
	
	console.log(add(1, 2, 3)(4)(5)(7).toString()) //22
