# 🎭 AI Sentiment Analysis Dashboard

A sophisticated, real-time sentiment analysis application built with React and powered by Google's Gemini 2.5 Flash model. This dashboard moves beyond simple positive/negative tagging to provide deep emotional intelligence, detecting nuances like sarcasm, specific emotions (Joy, Fear, Anger), and extracting named entities.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange.svg)

## ✨ Key Features

### 🎤 Multi-Modal Inputs
- **Text & Batch Analysis**: Analyze single paragraphs or batch-process multiple texts at once
- **Voice-to-Text**: Built-in speech recognition for real-time oral analysis
- **File Upload**: Parse and analyze local `.txt` files

### 🧠 Advanced AI Capabilities
- **Granular Analysis**: Sentence-by-sentence sentiment breakdown
- **Emotion Detection**: Radar charts visualizing intensity of emotions like Joy, Sadness, and Surprise
- **Sarcasm Detection**: Identifies subtle linguistic cues and contextual irony
- **Named Entity Recognition**: Extracts people, places, and organizations from text
- **Comparative Analysis**: Side-by-side comparison of two texts to find emotional contrast and shared keywords

### 📊 Smart Visualization
- **Interactive Bar Charts**: Sentiment distribution across your text
- **Emotion Radar Charts**: Multi-dimensional emotion intensity visualization
- **Word Clouds**: Frequently used emotional keywords
- **Particle Background**: Animated background that physically reacts to mouse movement and changes color based on detected mood

### 🎵 Mood Enhancers
- **Music Suggestions**: AI-generated playlist recommendations (Spotify/YouTube) tailored to your text's mood
- **Inspirational Quotes**: Contextually relevant quotes based on sentiment analysis

### 📈 Reporting & Export
- Export analysis history as **PDF**, **CSV**, or **JSON**
- Persistent local storage of analysis history
- Detailed analytics with timestamp tracking

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend framework with Hooks and Functional Components |
| **Vite** | Lightning-fast build tool and dev server |
| **TypeScript** | Type-safe development |
| **Google GenAI SDK** | AI integration using Gemini 2.5 Flash model |
| **Tailwind CSS** | Utility-first styling with dark mode and glassmorphism |
| **Recharts** | Interactive and responsive chart library |
| **Web Speech API** | Native browser speech recognition |
| **html2canvas & jsPDF** | PDF report generation |
| **Lucide React** | Beautiful icon system |

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-sentiment-dashboard.git
   cd ai-sentiment-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Basic Text Analysis
1. Enter or paste text into the main input area
2. Click **Analyze Sentiment** to process
3. View detailed results including sentiment scores, emotions, and entities

### Voice Analysis
1. Click the **microphone icon** to start recording
2. Speak clearly into your device's microphone
3. Click again to stop and automatically analyze

### Batch Processing
1. Switch to **Batch Analysis** tab
2. Enter multiple texts (one per line)
3. Analyze all texts simultaneously

### Comparative Analysis
1. Navigate to the **Compare** tab
2. Enter two different texts
3. View side-by-side emotional differences and shared themes

### File Upload
1. Click the **upload icon**
2. Select a `.txt` file from your device
3. File content will be automatically analyzed

### Exporting Results
- Click **Export** button in the history panel
- Choose format: PDF, CSV, or JSON
- Download your comprehensive analysis report

## 🎨 Features Showcase

### Emotion Radar Chart
Visualizes six core emotions with intensity scores:
- Joy
- Sadness
- Anger
- Fear
- Surprise
- Disgust

### Interactive Particle Background
- Responds to mouse movement with physical attraction
- Color shifts based on detected sentiment (green for positive, red for negative, blue for neutral)
- Creates an immersive, dynamic user experience

### Sentiment Timeline
Track sentiment changes across multiple analyses with historical data visualization.

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Contributors

This project was developed by:

- **Nkosimphile Siyabonga Mnisi** - Lead Developer & AI Integration
- **Buhlaluse Ngcobo** - Frontend Development & UI/UX Design
- **Kamogelo Mothupi** - Data Visualization & Analytics
- **Jereshan Sinan** - Backend Architecture & Testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing advanced language model capabilities
- The React and TypeScript communities for excellent documentation
- All open-source libraries that made this project possible

**Made with ❤️ and AI by the Sentiment Analysis Team**
