
import React, { useState, useCallback, useEffect } from 'react';
import {
  ActiveTab,
  ApiStatus,
  Sentiment,
  SentimentAnalysisResult,
  SentimentScores,
} from './types';
import { analyzeSentiment } from './services/geminiService';
import {
  BatchIcon,
  ChartLineIcon,
  CheckCircleIcon,
  CsvIcon,
  JsonIcon,
  PdfIcon,
  SearchIcon,
  UploadIcon,
  BrainIcon,
  SentimentPositiveIcon,
  SentimentNegativeIcon,
  SentimentNeutralIcon
} from './components/Icons';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// --- Helper Functions ---

const getSentimentIcon = (sentiment: Sentiment) => {
    switch (sentiment) {
        case Sentiment.Positive: return <SentimentPositiveIcon className="w-5 h-5" />;
        case Sentiment.Negative: return <SentimentNegativeIcon className="w-5 h-5" />;
        case Sentiment.Neutral: return <SentimentNeutralIcon className="w-5 h-5" />;
        default: return null;
    }
};

const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
        case Sentiment.Positive: return { text: 'text-[#0d6efd]', bg: 'bg-blue-100', hex: '#4cc9f0' };
        case Sentiment.Negative: return { text: 'text-danger', bg: 'bg-red-100', hex: '#f72585' };
        case Sentiment.Neutral: return { text: 'text-warning', bg: 'bg-yellow-100', hex: '#f8961e' };
        default: return { text: 'text-gray', bg: 'bg-gray-light', hex: '#6c757d' };
    }
};

const calculateSummaryStats = (results: SentimentAnalysisResult[]) => {
    if (results.length === 0) return null;
    const sentimentCounts = results.reduce((acc, r) => {
        acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
        return acc;
    }, {} as Record<Sentiment, number>);

    const dominantSentiment = Object.keys(sentimentCounts).reduce((a, b) => sentimentCounts[a as Sentiment] > sentimentCounts[b as Sentiment] ? a : b) as Sentiment;

    const totalConfidence = results.reduce((sum, r) => sum + r.confidence, 0);
    const averageConfidence = (totalConfidence / results.length) * 100;

    return {
        totalTexts: results.length,
        dominantSentiment,
        averageConfidence: averageConfidence.toFixed(1) + '%',
        distribution: sentimentCounts,
    };
}


// --- UI Components ---

const Header: React.FC<{ apiStatus: ApiStatus }> = ({ apiStatus }) => {
    const statusConfig = {
        ready: { icon: <CheckCircleIcon className="w-5 h-5 text-success" />, bg: 'bg-success/20' },
        loading: { icon: <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin"></div>, bg: 'bg-warning/20' },
        error: { icon: <div className="w-5 h-5 text-danger">!</div>, bg: 'bg-danger/20' },
        success: { icon: <CheckCircleIcon className="w-5 h-5 text-success" />, bg: 'bg-success/20' },
    };
    const currentStatus = statusConfig[apiStatus.status];

    return (
        <header className="text-center mb-8 p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                <ChartLineIcon className="w-8 h-8" />
                Sentiment Analysis Dashboard
            </h1>
            <p className="text-lg opacity-90 mb-4">Analyze emotional tone in text content using Google Gemini</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${currentStatus.bg}`}>
                {currentStatus.icon}
                <span>{apiStatus.message}</span>
            </div>
        </header>
    );
};

const InputSection: React.FC<{ onAnalyze: (text: string | string[]) => void; isLoading: boolean }> = ({ onAnalyze, isLoading }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.TextInput);
    const [textInput, setTextInput] = useState('');
    const [batchInput, setBatchInput] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setTextInput(content);
            };
            reader.readAsText(file);
        }
    };

    const handleAnalyzeClick = () => {
        if (isLoading) return;
        switch (activeTab) {
            case ActiveTab.TextInput:
            case ActiveTab.FileUpload:
                if (textInput.trim()) onAnalyze(textInput);
                break;
            case ActiveTab.BatchProcessing:
                if (batchInput.trim()) {
                    const texts = batchInput.split('\n').map(t => t.trim()).filter(Boolean);
                    if (texts.length > 0) onAnalyze(texts);
                }
                break;
        }
    };
    
    const sampleTexts = [
        { text: "I absolutely love this product! It's amazing and works perfectly.", label: "😊 Positive" },
        { text: "This is the worst service I've ever experienced. Completely disappointed.", label: "😠 Negative" },
        { text: "The package arrived on time and was as described.", label: "😐 Neutral" }
    ];

    const tabs = [
        { id: ActiveTab.TextInput, label: 'Text Input', icon: <SearchIcon className="w-4 h-4 mr-2"/> },
        { id: ActiveTab.FileUpload, label: 'File Upload', icon: <UploadIcon className="w-4 h-4 mr-2"/> },
        { id: ActiveTab.BatchProcessing, label: 'Batch Processing', icon: <BatchIcon className="w-4 h-4 mr-2"/> },
    ];
    
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex border-b border-gray-light mb-4">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray hover:text-dark'}`}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className={activeTab === ActiveTab.TextInput ? 'block' : 'hidden'}>
                <label htmlFor="text-input-area" className="block text-sm font-medium text-dark mb-1">Enter Text to Analyze</label>
                <textarea id="text-input-area" value={textInput} onChange={e => setTextInput(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full p-2 border border-gray-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 min-h-[150px]"/>
                <div className="mt-2">
                    <p className="text-xs text-gray mb-2">Try sample texts:</p>
                    <div className="flex flex-wrap gap-2">
                        {sampleTexts.map(sample => (
                            <button key={sample.label} onClick={() => setTextInput(sample.text)} className="px-3 py-1 bg-gray-light text-dark rounded-full text-xs hover:bg-primary hover:text-white transition-colors">
                                {sample.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={activeTab === ActiveTab.FileUpload ? 'block' : 'hidden'}>
                <div className="border-2 border-dashed border-gray-light rounded-md p-6 text-center">
                    <UploadIcon className="w-12 h-12 mx-auto text-gray" />
                    <p className="mt-2 text-sm text-gray">Upload a text file (.txt) for analysis</p>
                    <label htmlFor="file-input" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-primary-dark transition-colors">Choose File</label>
                    <input type="file" id="file-input" accept=".txt" className="hidden" onChange={handleFileChange} />
                    {fileName && <p className="text-sm text-gray mt-2">Selected: {fileName}</p>}
                </div>
            </div>

            <div className={activeTab === ActiveTab.BatchProcessing ? 'block' : 'hidden'}>
                 <label htmlFor="batch-text-area" className="block text-sm font-medium text-dark mb-1">Enter multiple texts (one per line)</label>
                <textarea id="batch-text-area" value={batchInput} onChange={e => setBatchInput(e.target.value)}
                    placeholder="Enter each text on a new line..."
                    className="w-full p-2 border border-gray-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 min-h-[150px]"/>
                <p className="text-xs text-gray mt-1">Limit: 10 texts per batch analysis.</p>
            </div>
            
            <button onClick={handleAnalyzeClick} disabled={isLoading}
                className="mt-4 w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:bg-gray disabled:cursor-not-allowed">
                {isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Analyzing...</> : <><SearchIcon className="w-5 h-5" /> Analyze Sentiment</>}
            </button>
        </div>
    );
};


const ResultCard: React.FC<{ result: SentimentAnalysisResult }> = ({ result }) => {
    const sentimentColors = getSentimentColor(result.sentiment);
    return (
        <div className="border border-gray-light rounded-lg p-4 mb-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase ${sentimentColors.bg} ${sentimentColors.text}`}>
                    {getSentimentIcon(result.sentiment)}
                    {result.sentiment}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-dark">
                    <BrainIcon className="w-4 h-4 text-primary"/>
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                </span>
            </div>
            <p className="text-dark italic mb-3">"{result.text}"</p>
            <div className="mb-3">
                <strong className="text-sm font-medium text-dark">Key Phrases:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                    {result.keywords.map(kw => <span key={kw} className="bg-gray-light text-dark text-xs px-2 py-1 rounded-full">{kw}</span>)}
                </div>
            </div>
            <p className="text-sm text-gray pt-3 border-t border-gray-light">
                <strong className="text-dark">Analysis:</strong> {result.explanation}
            </p>
             <div className="text-xs text-gray mt-3 pt-2 border-t border-gray-light">
                Powered by {result.apiUsed === 'gemini' ? 'Google Gemini' : 'Fallback Analysis'} &bull; {new Date(result.timestamp).toLocaleString()}
            </div>
        </div>
    );
};

const ResultsSection: React.FC<{ results: SentimentAnalysisResult[], onExport: (format: 'csv'|'json'|'pdf') => void }> = ({ results, onExport }) => {
    const hasResults = results.length > 0;
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-light">
                <h2 className="text-xl font-bold text-dark mb-2 sm:mb-0">Analysis Results</h2>
                <div className="flex gap-2">
                    <button onClick={() => onExport('pdf')} disabled={!hasResults} className="flex items-center gap-1 text-sm bg-light text-dark px-3 py-1 rounded-md border border-gray-light hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><PdfIcon className="w-4 h-4"/> PDF</button>
                    <button onClick={() => onExport('csv')} disabled={!hasResults} className="flex items-center gap-1 text-sm bg-light text-dark px-3 py-1 rounded-md border border-gray-light hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><CsvIcon className="w-4 h-4"/> CSV</button>
                    <button onClick={() => onExport('json')} disabled={!hasResults} className="flex items-center gap-1 text-sm bg-light text-dark px-3 py-1 rounded-md border border-gray-light hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><JsonIcon className="w-4 h-4"/> JSON</button>
                </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto pr-2">
                {!hasResults ? (
                    <div className="text-center py-10 text-gray">
                        <ChartLineIcon className="w-12 h-12 mx-auto mb-2 opacity-50"/>
                        <h3 className="font-semibold">No Analysis Yet</h3>
                        <p className="text-sm">Enter text to see sentiment results</p>
                    </div>
                ) : (
                    results.map((res, i) => <ResultCard key={i} result={res} />)
                )}
            </div>
        </div>
    );
};

const VisualizationSection: React.FC<{ results: SentimentAnalysisResult[] }> = ({ results }) => {
    let breakdownData: { name: string, value: number }[] = [];
    let confidenceData: { name: string, confidence: number, sentiment: Sentiment }[] = [];
    
    if(results.length > 1) { // Batch results
        const counts = results.reduce((acc, r) => {
            acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
            return acc;
        }, {} as Record<Sentiment, number>);
        // FIX: Cast value to number as Object.entries can infer it as unknown.
        breakdownData = Object.entries(counts).map(([name, value]) => ({ name: name as Sentiment, value: value as number }));
        confidenceData = results.map((r, i) => ({ name: `Text ${i+1}`, confidence: parseFloat((r.confidence*100).toFixed(1)), sentiment: r.sentiment }));

    } else if (results.length === 1) { // Single result
        const { scores } = results[0];
        // FIX: Cast value to number as Object.entries can infer it as unknown.
        breakdownData = Object.entries(scores).map(([name, value]) => ({ name: name as Sentiment, value: Math.round((value as number)*100) }));
        confidenceData = [{ name: 'Analysis', confidence: parseFloat((results[0].confidence*100).toFixed(1)), sentiment: results[0].sentiment }];
    }

    const renderChart = (title: string, data: any[], children: React.ReactNode, chartId: string) => (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">{title}</h3>
            <div id={chartId} className="h-64 bg-white p-2">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                       {children}
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray">
                        <ChartLineIcon className="w-10 h-10 mb-2 opacity-50"/>
                        <p className="text-sm">No data to display</p>
                    </div>
                )}
            </div>
        </div>
    );
    
    return (
        <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Visualizations</h2>
            <div className="grid md:grid-cols-2 gap-6">
                 {renderChart('Sentiment Breakdown', breakdownData, 
                    <BarChart data={breakdownData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip formatter={(value:number) => [`${value}%`, "Percentage"]} />
                        <Bar dataKey="value" fill="#8884d8">
                          {breakdownData.map((entry) => (
                              <Cell key={`cell-${entry.name}`} fill={getSentimentColor(entry.name as Sentiment).hex} />
                          ))}
                        </Bar>
                    </BarChart>,
                    "sentiment-breakdown-chart"
                )}
                {renderChart('Confidence Scores', confidenceData,
                    <BarChart data={confidenceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                        <Tooltip formatter={(value: number) => [`${value}%`, "Confidence"]} />
                        <Bar dataKey="confidence" fill="#82ca9d">
                             {confidenceData.map((entry) => (
                              <Cell key={`cell-${entry.name}`} fill={getSentimentColor(entry.sentiment).hex} />
                          ))}
                        </Bar>
                    </BarChart>,
                    "confidence-scores-chart"
                )}
            </div>
        </section>
    )
};

const App: React.FC = () => {
    const [results, setResults] = useState<SentimentAnalysisResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: 'ready', message: 'Gemini API Ready' });
    
    const handleAnalyze = useCallback(async (input: string | string[]) => {
        setIsLoading(true);
        const texts = Array.isArray(input) ? input.slice(0, 10) : [input];
        setApiStatus({ status: 'loading', message: `Analyzing ${texts.length} text(s)...` });

        try {
            const analysisPromises = texts.map(text => analyzeSentiment(text));
            const newResults = await Promise.all(analysisPromises);
            setResults(newResults);
            setApiStatus({ status: 'success', message: `Analysis complete for ${newResults.length} text(s)!` });
        } catch (error) {
            console.error(error);
            setApiStatus({ status: 'error', message: 'Analysis failed.' });
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
        if(results.length === 0) return;

        const downloadFile = (content: string, fileName: string, contentType: string) => {
             const blob = new Blob([content], { type: contentType });
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = fileName;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             URL.revokeObjectURL(url);
        }

        if(format === 'json') {
            downloadFile(JSON.stringify(results, null, 2), 'sentiment-analysis.json', 'application/json');
        } else if (format === 'csv') {
            let csvContent = "Text,Sentiment,Confidence,Positive Score,Negative Score,Neutral Score,Keywords,Timestamp\n";
            results.forEach(item => {
                const escapedText = `"${item.text.replace(/"/g, '""')}"`;
                const keywords = item.keywords.join('; ');
                const confidence = (item.confidence * 100).toFixed(2);
                const scores = item.scores || { positive: 0, negative: 0, neutral: 0 };
                csvContent += `${escapedText},${item.sentiment},${confidence}%,${(scores.positive * 100).toFixed(2)}%,${(scores.negative * 100).toFixed(2)}%,${(scores.neutral * 100).toFixed(2)}%,${keywords},${item.timestamp}\n`;
            });
            downloadFile(csvContent, 'sentiment-analysis.csv', 'text/csv');
        } else if (format === 'pdf') {
            setIsLoading(true);
            setApiStatus({ status: 'loading', message: 'Generating PDF report...' });

            // @ts-ignore
            const { jsPDF } = window.jspdf;
            // @ts-ignore
            const html2canvas = window.html2canvas;

            if (!html2canvas) {
                alert('PDF generation library (html2canvas) is not available. Please refresh and try again.');
                setIsLoading(false);
                setApiStatus({ status: 'ready', message: 'Gemini API Ready' });
                return;
            }

            try {
                const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
                const pageWidth = doc.internal.pageSize.getWidth();
                const margin = 15;
                let y = 20;

                // --- Header ---
                doc.setFontSize(22);
                doc.setFont('helvetica', 'bold');
                doc.text('Sentiment Analysis Report', pageWidth / 2, y, { align: 'center' });
                y += 8;
                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });
                y += 15;

                // --- Summary Section ---
                const stats = calculateSummaryStats(results);
                if (stats) {
                    doc.setFontSize(16);
                    doc.text('Executive Summary', margin, y);
                    y += 8;
                    doc.setFontSize(11);
                    doc.text(`- Total Texts Analyzed: ${stats.totalTexts}`, margin + 5, y);
                    y += 7;
                    doc.text(`- Dominant Sentiment: ${stats.dominantSentiment.charAt(0).toUpperCase() + stats.dominantSentiment.slice(1)}`, margin + 5, y);
                    y += 7;
                    doc.text(`- Average Confidence: ${stats.averageConfidence}`, margin + 5, y);
                    y += 15;
                }

                // --- Visualizations ---
                const breakdownChartEl = document.getElementById('sentiment-breakdown-chart');
                const confidenceChartEl = document.getElementById('confidence-scores-chart');

                const addChartToPdf = async (el: HTMLElement | null, title: string) => {
                    if (!el) return;
                     if (y > 180) { doc.addPage(); y = 20; }
                    doc.setFontSize(16);
                    doc.text(title, margin, y);
                    y += 8;
                    const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const imgProps = doc.getImageProperties(imgData);
                    const imgWidth = pageWidth - margin * 2;
                    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                    doc.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
                    y += imgHeight + 15;
                };

                await addChartToPdf(breakdownChartEl, 'Sentiment Breakdown');
                await addChartToPdf(confidenceChartEl, 'Confidence Scores');

                // --- Detailed Results ---
                doc.addPage();
                y = 20;
                doc.setFontSize(16);
                doc.text('Detailed Analysis Results', margin, y);
                y += 10;
                
                results.forEach((result, index) => {
                    const textLines = doc.splitTextToSize(`"${result.text}"`, pageWidth - margin * 2 - 5);
                    const sectionHeight = 20 + textLines.length * 4;
                    if (y + sectionHeight > 280) {
                        doc.addPage();
                        y = 20;
                    }

                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`Analysis #${index + 1}: ${result.sentiment.toUpperCase()} (${(result.confidence * 100).toFixed(1)}%)`, margin, y);
                    y += 8;
                    
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.text(textLines, margin + 5, y);
                    y += textLines.length * 4 + 8;
                });
                
                // --- Footer with page numbers ---
                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(9);
                    doc.setTextColor(150);
                    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, { align: 'center' });
                }

                doc.save('sentiment-analysis-report.pdf');
            } catch (error) {
                console.error("PDF generation failed:", error);
                alert("An error occurred while generating the PDF report.");
            } finally {
                setIsLoading(false);
                setApiStatus({ status: 'success', message: 'Report generated successfully!' });
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-dark">
            <main className="max-w-7xl mx-auto p-4 md:p-6">
                <Header apiStatus={apiStatus} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
                    <ResultsSection results={results} onExport={handleExport}/>
                </div>
                {results.length > 0 && 
                    <div className="mt-8">
                        <VisualizationSection results={results} />
                    </div>
                }
                 <footer className="text-center mt-8 py-4 border-t border-gray-light">
                    <p className="text-sm text-gray">Powered by Google Gemini API</p>
                    <p className="text-xs text-gray mt-1">Disclaimer: AI analysis may not be 100% accurate. Use as guidance only.</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
