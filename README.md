<h1 align="center">💊 PillPal</h1>
<p align="center"><i>scan your medicine, get reminded, stop forgetting</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Expo-54-000020?logo=expo">
  <img src="https://img.shields.io/badge/status-in_progress-ffb347">
</p>

---

## The idea

A lot of people (myself included, honestly) forget to take their medicine on time. On top of that, reading those tiny labels and figuring out the schedule is kind of annoying. That's why I started PillPal.

Basically, you point your phone camera at a medicine label, and the app reads it for you. Then, it sets up reminders so your phone tells you when it's time to take it.

## What it does right now

- **Scan a label.** You can take a photo with the camera or pick one from your gallery.
- **Medication reminders.** PillPal asks for notification permission and then sends you a reminder (there's a test button so you can see how it looks).
- **Simple navigation** between the home screen and the scanner.

## What's next

Right now, the text reading part is still a placeholder, so the next big step is hooking up real OCR so it can actually pull the medicine name and dosage off the label. After that, I want to turn what it reads into an actual reminder schedule automatically, instead of just a test notification.

## Built with

- React Native and Expo
- React Navigation
- Expo Camera and Expo Image Picker
- Expo Notifications

## Running it

First, make sure you have Node.js installed, and also download the **Expo Go** app on your phone.

Then, clone and install:

```bash
git clone https://github.com/KUlusoy/PillPal.git
cd PillPal
npm install
```

After that, start it up:

```bash
npx expo start
```

Finally, scan the QR code that shows up with Expo Go, and the app will open on your phone.

## Files

```
PillPal/
├── App.js            # home screen, navigation, and notifications
├── ScannerScreen.js  # camera and label scanning
├── app.json          # Expo settings
└── assets/           # icons and splash screen
```
