README
======

Example showing a bug when deep links include special characters (either in a route segment, or in the url parameters). Deep links are handled in the file `app/[...rest].tsx`


1. Build a dev client for Android

eas build --profile development --platform android  
yarn start  
Open an android emulator.

2. Test deep links using adb:

### SUCCESS
`adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%20%21%22%24%27%28%29%2Aend"`

-> OK, returns {"searchParams": {"firstParam": "start !\"$'()*end", "rest": ["somedeeplink", "other", "route"]}}

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://products/facet/discountBands/up%20to%2050%20discount"`

-> OK, returns {"searchParams": {"rest": ["products", "facet", "discountBands", "up%20to%2050%20discount"]}}

### FAILURE (app crash !)
Using %25 which is '%':

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%25end"`

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://products/facet/discountBands/up%20to%2050%25%20discount"`

-> URIError: Malformed decodeURI input, js engine: hermes in LocationProvider.tsx:49:18

### FAILURE
No crash but local search params messed up using encoded '#', '&' or '+' (maybe other?)

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%23end"`

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%26end"`

`adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%2Bend"`
