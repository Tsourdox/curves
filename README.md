# En kurvig lärdom

Den här kodbasen skapade jag för att lära mig hur kurvor generellt sett fungerar och ritas med P5 biblioteket. Utmaningen uppstod under [Puzzelin](https:puzzelin.se) projektet när jag skulle skapa formen på en pusselbit. Eftersom jag inte tidigare hade jobbat med kurvor och att Puzzelin-kodbasen började innehålla många filer och kodrader ville jag isolera just det här problemet för att underlätta min lärandeprocess.

De filerna som finns är:

1. [Mitt första test](./first-test.js) som bara ritar den fyrkantiga formen på en pusselbit.
2. [Main filen](main.js) som är ett interaktivt program där det går att klicka ut nya punkter och dra i dom efter att formen har slutits, vilket görs genom att trycka på `Mellanslag`. Det hjälte mig otroligt mycket att få fram ungefär hur många punkter jag behövde och vilken positionering varje punkt ska vara på för att frå fram formen på en pusselbit.
3. [En sidan av pusselbiten](side.js) vilket var det jag ville få fram i slutändan.

## Pseudokod

```
function createCurves(pointGrid)
  for each point in pointGrid:
  createCurve(point, nextPoint)

function createCurve(startPoint, endPoint)
  set general form:
  createFirstControlPoint(startPoint, endPoint)
  createLastControlPoint(startPoint, endPoint)

  decide on bay or headland a.k.a out or in

  create three points for bay/headland:
  determinePointLocations(startPoint, endPoint)
  createBezierPoint(location, rotation, magnitude)
  randomizeBezierPoint(maxLoc, maxRot, maxMag, maxMagShift)
```
