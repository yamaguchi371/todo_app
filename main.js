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

var app = new Vue ({
    el: '#app',
    data: {
        todos: [],
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ],
        // 選択しているoptionのvalueを記憶するためのデータ
        // 初期値を「ー１」つまり「すべて」にする
        current: -1
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
        },
        // 状態変更の処理
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },
        // 削除の処理
        doRemove: function(item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },
    watch: {
        // オプションを使う場合はオブジェクト形式にする
        todos: {
            // 引数はウォッチしているプロパティの変更後の値
            handler: function(todos) {
                todoStorage.save(todos)
            },
            // deepオプションでネストしているデータも監視できる
            deep: true
        }
    },
    created() {
        // インスタンス作成時に自動的にfetch()する
        this.todos = todoStorage.fetch()
    },
    computed: {
        labels() {
            return this.options.reduce(function(a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
        },
        computedTodos: function() {
            // データがcurrentがー１ならすべて
            // それ以外ならcurrentとstateが一致するものだけに絞り込む
            return this.todos.filter(function(el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        }
    }
})

