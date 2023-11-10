
import { useLocalSearchParams } from 'expo-router'
import {View, Text} from 'react-native'

/**
 * Test for special characters in deep links
 * Build an expo dev client and run these:
 * 
 * SUCCESS
 * -------
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%20%21%22%24%27%28%29%2Aend"
 * -> OK, returns {"searchParams": {"firstParam": "start !\"$'()*end", "rest": ["somedeeplink", "other", "route"]}}
 * 
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://products/facet/discountBands/up%20to%2050%20discount"
 * -> OK, returns {"searchParams": {"rest": ["products", "facet", "discountBands", "up%20to%2050%20discount"]}}
 * 
 * FAILURE (!!! app crash !!!) using %25 which is '%'
 * -------
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%25end"
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://products/facet/discountBands/up%20to%2050%25%20discount"
 * -> URIError: Malformed decodeURI input, js engine: hermes in LocationProvider.tsx:49:18
 * 
 * FAILURE (no crash but local search params messed up) using encoded '#', '&' or '+' (maybe other?)
 * -------
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%23end"
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%26end"
 * adb shell am start -W -a android.intent.action.VIEW -d "myapp://somedeeplink/other/route?firstParam=start%2Bend"
 * 
 */
export default function RestPage() {
  const searchParams = useLocalSearchParams()
  console.log({searchParams});
  return <View><Text>Test Deep Links</Text></View>
}
