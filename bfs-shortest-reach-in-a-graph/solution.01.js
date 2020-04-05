function processData(input) {
    //Enter your code here
    const lines = input.split('\n')
    let q = Number(lines.shift())
    
    while (q > 0) {
        q--
        const [n, m] = lines.shift().split(' ').map(item => Number(item))
        const edges = lines.splice(0,m).map(line => line.split(' ').map(item => Number(item)))
        const start = Number(lines.shift())
        console.log(processBFS(n, edges, start))
    }
} 

function processBFS(n, edges, start) {
    const graph = {}
    const result = {}
    for (let i = 0; i < n; i++) {
        graph[i+1] = []
        result[i+1] = -1
    }

    edges.forEach(e => {
        graph[e[0]].push(e[1])
        graph[e[1]].push(e[0])
    })

    const q = [[start, 0]]
    const visited = new Set()
    visited.add(start)
    while (q.length > 0) {
        const current = q.shift()
        result[current[0]] = current[1]
        graph[current[0]].forEach(node => {
            if (!visited.has(node)) {
                visited.add(node)
                q.push([node, current[1]+6])
            }
        })
    }

    return Object.keys(result)
        .filter(k => k != start)
        .map(k => result[k])
        .join(' ')


}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

