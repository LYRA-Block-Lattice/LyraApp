call .\node_modules\.bin\replace-in-file /=\"\.\.\/asserts\//g =\"_content/ReactRazor/asserts/ .\src\components\**.** --isRegex --verbose
call .\node_modules\.bin\replace-in-file /=\"\.\.\/asserts\//g =\"_content/ReactRazor/asserts/ .\src\pages\**.** --isRegex --verbose

rem call .\node_modules\.bin\replace-in-file /\.\.\/\.\.\/public\/asserts\//g _content/ReactRazor/asserts/ .\src\components\**.** --isRegex --verbose
rem call .\node_modules\.bin\replace-in-file /\.\.\/\.\.\/public\/asserts\//g _content/ReactRazor/asserts/ .\src\pages\**.** --isRegex --verbose
