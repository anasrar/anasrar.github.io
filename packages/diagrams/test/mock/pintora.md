## Code

### Inline

Inline `code example`

### Block

```
filter test
```

```diagram-pintora
sequenceDiagram
  title: Sequence Diagram Example
  autonumber
  User->>Pintora: render this
  activate Pintora
  loop Check input
    Pintora-->>Pintora: Has input changed?
  end
  Pintora-->>User: your figure here
  deactivate Pintora
  @note over User,Pintora: note over
  @note right of User: note aside actor
  @start_note right of User
  multiline note
  is possible
  @end_note
  == Divider ==
```

```diagram-pintora
activityDiagram
title: Activity Example
start
partition Init {
  :read config;
  :init internal services;
  note left: init themes
}
:Diagram requested;
if (diagram registered ?) then
  :get implementation;
else (no)
  :print error;
endif
switch ( renderer type )
case ( svg )
  :Generate svg;
case ( canvas )
  :Draw canvas;
case ( custom )
  :Custom renderer output;
endswitch
while (data available?) is (available)
  :read data;
  :generate diagrams;
endwhile (no)
end
```