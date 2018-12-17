(function (window) {
	'use strict';

		// 页面加载的时候,获取到localStorage中的数据
		let list = JSON.parse(localStorage.getItem('todoList')) || []

  const vm = new Vue({
		el: '.todoapp',
		data: {
			// list用于存储任务列表
			list,
			inputName: '',
			clickId: ''
		},
		methods: {
			addTodo () {

				// 获取到value值
				//给list添加一个任务即可
				this.list.unshift({
					id: +new Date(),
					name: this.inputName,
					completed: false
				})
			},
			delTodo (id) {

				let index = this.list.findIndex( item => item.id === id )

				this.list.splice( index, 1 )
			},
			showInput (id) {
				 this.clickId = id
				 // 只需要隐藏editing
			},
			updatedTodo () {
				// 要隐藏input框 editing
				this.clickId = ''
			},
			clearTodo () {
				this.list = this.list.filter( item => !item.completed )
			}
		},
		computed: {
			//需要显示所有的未完成的任务的数量
			leftCount () {
				return this.list.filter( item => !item.completed ).length
			},
			//控制底部显示和隐藏
			isShowFooter () {
				return this.list.length > 0
			},
			// 控制清除显示和隐藏
			isShowClear () {
				return this.list.some( item => item.completed )
			}
		},
		watch: {
			list: {
				handler(value) {
					// localStorage只能存储字符串类型，如果是复杂类型，需要转成字符串
					localStorage.setItem('todoList', JSON.stringify(value))
				},
				// 监听复杂类型的数据
				deep: true
			}
		}
	})

})(window);
