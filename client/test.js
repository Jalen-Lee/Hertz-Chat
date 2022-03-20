const testArr = [
  {
    name: 'A',
    children: [
      {
        name: 'a',
        children: [
          {
            name: '1',
            children: [
              {
                name: '1',
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'b',
        children: [],
      },
    ],
  },
  {
    name: 'B',
    children: [
      {
        name: '2',
        children: [],
      },
    ],
  },
  {
    name: 'C',
    children: [],
  },
]

function traverseArrayTree(arr, path) {
  if (!arr) return false
  if (path === '') return true
  const pathNodes = path.split('.')
  console.log('pathNodes', pathNodes)
  const curNode = pathNodes.shift()
  for (let i of arr) {
    console.log('i', i)
    if (i.name === curNode) {
      return traverseArrayTree(i.children, pathNodes.join('.'))
    }
  }
  return false
}
