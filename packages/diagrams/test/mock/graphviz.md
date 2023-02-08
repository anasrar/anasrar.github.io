## Code

### Inline

Inline `code example`

### Block

```
filter test
```

```diagram-graphviz layout="dot"
digraph FLow {
  bgcolor="transparent"
  rankdir=LR
  fontname="Sans-Serif"
  fontsize="12"
  node [shape=rect, fontname="Sans-Serif", fontsize="10"]
  edge [fontname="Sans-Serif", fontsize="8", labeldistance=4.5, labelangle=270 ]

  subgraph cluster_remark {
    mdast
    label="Remark"
    color="#7048e8"
    penwidth=2
  }

  subgraph cluster_rehype {
    hast
    label="Rehype"
    color="#7048e8"
    penwidth=2
  }

  Markdown -> mdast [
    minlen=1
    taillabel="mdast-util-from-markdown"
  ]
  mdast -> hast [
    minlen=1
    taillabel="mdast-util-to-hast"
  ]
  hast -> HTML [
    minlen=1
    taillabel="hast-util-to-html"
  ]
}
```
