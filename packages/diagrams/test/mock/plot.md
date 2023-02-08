## Code

### Inline

Inline `code example`

### Block

```
filter test
```

```diagram-plot
graph Flow {
  width="512"
  height="512"
  xDomainStart="-6"
  xDomainEnd="6"
  xTicks="10"
  yDomainStart="-6"
  yDomainEnd="6"
  yTicks="10"

  sine [
    fn="sin(x)"
    step="0.2"
  ]

  u1 [
    fn="x^2"
    step="0.25"
    color="orangered"
  ]

  u2 [
    fn="x^2*-1"
    step="0.25"
    color="indigo"
  ]

  s1 [
    fn="-x"
    step="12"
    color="olive"
  ]

  s2 [
    fn="x"
    step="1"
    curve="step"
    color="darkviolet"
  ]
}
```
