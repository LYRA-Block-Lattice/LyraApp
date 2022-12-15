
import Locofy source:

1, copy all src,public
2, replace string in all .tsx

replace when copy Locofy export files:

from
src="../asserts/
to
src="_content/ReactRazor/asserts/

run

.\node_modules\.bin\replace-in-file /src=\"..\/asserts\//g src=\"_content/ReactRazor/asserts/ .\src\components\**.tsx --isRegex --verbose
.\node_modules\.bin\replace-in-file /src=\"..\/asserts\//g src=\"_content/ReactRazor/asserts/ .\src\pages\**.tsx --isRegex --verbose