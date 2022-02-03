# Lyra App
The main App for Lyra eco-system.

# Mainnet
https://app.lyra.live/

# Testnet
https://apptestnet.lyra.live

# Devnet howto

1, clone core project https://github.com/LYRA-Block-Lattice/Lyra-Core
2, build & publish Lyra.Data into C:\working\lyra-tools\UserLibrary
3, add a new source: Visual Studio -> Tools -> Options -> Nuget package manager -> package source -> add
	give it a name, the path is C:\working\lyra-tools\UserLibrary
4, open solutions, upgrade dependencies packages for all projects.

# Code Style

* no modify global css. all css local with the .razor file.