# BookManKind

<img alt="React Native" src="https://img.shields.io/badge/react_native%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>

[![Generic badge](https://img.shields.io/badge/Development%20Status-In%20Progress%20%28Not%20released%20yet%29-yellowgreen.svg)](https://shields.io/)

An app that makes managing your book library super easy, and collaborative. View stats on your library, check out how many book demographics you can investigate, and view other people's libraries.

<p float="left">
<img src="/assets/screenshots/library-screen.png" width="32%">
<img src="/assets/screenshots/books-screen.png" width="32%">
<img src="/assets/screenshots/edit-screen.png" width="32%">
</p>

### Running

##### iOS

- `cd ios && pod install && cd ..`
  _If you're using an **M1 Mac**, run the pod install by opening terminal in Rosetta mode (Right-click terminal -> Get Info -> Open in Rosetta)_
  and then to run:
- `react-native run-ios` for default simulator
- `react-native run-ios --device` for real device (make sure it's connected to your computer)
- `npx react-native run-ios --simulator="iPhone SE (2nd generation)"` for a _specific_ simulator

### Troubleshooting

##### iOS
- XCode build fails `'atomic_notify_one<unsigned long>' is unavailable`
Change the "use_flipper" reference in your podfile to this:
`use_flipper!({ 'Flipper-Folly' => '2.5.3', 'Flipper' => '0.87.0', 'Flipper-RSocket' => '1.3.1' })`
Then run `pod repo update` and `pod install` and rebuild.
