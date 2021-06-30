var STORAGE_KEY = 'todo-vuejs-demo'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue ({
    el: '#app',
    data: {
        todos: []
    },
    methods: {
        
        // ToDo追加の処理
        doAdd: function(event, value) {
            // refで名前を付けておいた要素を参照
            var comment = this.$refs.comment
            // 入力が無ければ何もしないでreturn
            if (!comment.value.length) {
                return
            }
            // { 新しいID、コメント、作業状態 }
            // というオブジェクトを現在のtodoリストへpush
            // 作業状態「state」はデフォルト「作業中＝０」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // フォーム要素を空にする
            comment.value = ''
        }
    }
})

