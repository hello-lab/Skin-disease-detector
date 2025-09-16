'use client';

import { useState, useRef } from 'react';
import {
  Card,
  Button,
  Text,
  Heading,
  Flex,
  Box,
  Separator,
  Dialog,
  AlertDialog,
  ScrollArea,
} from '@radix-ui/themes';

export default function ImageClassifyPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResult(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleZoneClick = () => {
    document.getElementById('file-input').click();
  };

  const handleShowCamera = async () => {
    setError('');
    setResult(null);
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera.');
      setShowCamera(false);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const imageFile = new File([blob], 'captured-image.png', { type: 'image/png' });
        setFile(imageFile);
        setResult(null);
        setError('');
      }
    }, 'image/png');
    handleCloseCamera();
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/prediction', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Unknown error');
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ minHeight: '70vh', width: '100%' }}>
      <Card
        style={{
          maxWidth: 700,
          width: '100%',
          marginTop: 40,
          padding: 32,
          background: '#222',
          borderRadius: 16,
          boxShadow: '0 4px 32px #0004',
        }}
      >
        <Heading align="center" size="6" mb="5" color="accent">
          Image Classification
        </Heading>
        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
          <Flex gap="3" align="center" justify="center" mb="4" wrap="wrap">
            <Box
              asChild
              style={{
                flex: 1,
                border: '2px dashed',
                borderColor: dragActive ? 'var(--accent-9)' : 'var(--accent-7)',
                background: dragActive ? 'var(--accent-2)' : '#292929',
                color: dragActive ? 'var(--accent-11)' : '#aaa',
                borderRadius: 12,
                padding: '32px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
                minWidth: 220,
              }}
            >
              <div
                tabIndex={0}
                aria-label="Image dropzone"
                onClick={handleZoneClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="button"
              >
                {file ? (
                  <Text color="accent" weight="medium">
                    {file.name}
                  </Text>
                ) : (
                  <Box>
                    <Text color="accent" weight="bold">
                      Drag &amp; drop
                    </Text>{' '}
                    an image here,
                    <br />
                    or{' '}
                    <Text as="span" underline color="accent" style={{ cursor: 'pointer' }}>
                      click to select
                    </Text>
                    <br />
                    <Button
                      variant="solid"
                      color="accent"
                      mt="2"
                      size="2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowCamera();
                      }}
                      disabled={loading}
                    >
                      Capture from Camera
                    </Button>
                  </Box>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                />
              </div>
            </Box>
            <Button
              type="submit"
              color="accent"
              size="3"
              disabled={loading || !file}
              style={{
                minWidth: 110,
                fontWeight: 600,
                background: loading || !file ? 'var(--accent-4)' : undefined,
                cursor: loading || !file ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      border: '2px solid var(--accent-11)',
                      borderTop: '2px solid var(--accent-9)',
                      borderRadius: '50%',
                      marginRight: 8,
                      animation: 'spin 1s linear infinite',
                      verticalAlign: 'middle',
                    }}
                  />
                  Predicting...
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg);}
                      100% { transform: rotate(360deg);}
                    }
                  `}</style>
                </>
              ) : (
                'Classify'
              )}
            </Button>
          </Flex>
        </form>

        {/* Camera Dialog */}
        <Dialog.Root open={showCamera} onOpenChange={setShowCamera}>
          <Dialog.Content
            style={{
              background: 'var(--accent-2)',
              padding: 24,
              borderRadius: 12,
              boxShadow: '0 4px 32px #0008',
              minWidth: 340,
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Flex direction="column" align="center" gap="4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  borderRadius: 8,
                  marginBottom: 16,
                  width: 320,
                  height: 240,
                  background: '#111',
                  maxWidth: '100%',
                }}
              />
              <Flex gap="3">
                <Button color="accent" onClick={handleCapture}>
                  Capture
                </Button>
                <Button color="gray" variant="soft" onClick={handleCloseCamera}>
                  Cancel
                </Button>
              </Flex>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        {/* Error Alert */}
        <AlertDialog.Root open={!!error}>
          <AlertDialog.Content style={{ background: 'var(--accent-2)', color: 'var(--accent-11)', border: 'none' }}>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>{error}</AlertDialog.Description>
            <Flex justify="end" mt="3">
              <Button color="accent" variant="soft" onClick={() => setError('')}>
                Close
              </Button>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>

        {/* Result */}
        {result && (
          <Card mt="7" p="5" style={{ background: 'var(--accent-2)', borderRadius: 12 }}>
            <Heading size="4" mb="2" color="accent">
              Result
            </Heading>
            <Text size="3" mb="2" color="accent">
              {result.misc?.common_name || 'No prediction line.'}
            </Text>
            <Box mb="1">
              <Text as="span" weight="bold" color="accent">
                Scientific Name:
              </Text>{' '}
              <Text color="accent">{result.description || 'N/A'}</Text>
            </Box>
            <Box mb="1">
              <Text as="span" weight="bold" color="accent">
                Medication:
              </Text>{' '}
              <Text color="accent">{result.misc?.medication || 'N/A'}</Text>
            </Box>
            <Box mb="1">
              <Text as="span" weight="bold" color="accent">
                Next Steps:
              </Text>{' '}
              <Text color="accent">{result.misc?.next_steps || 'N/A'}</Text>
            </Box>
            <Separator my="3" />
            <details>
              <summary style={{ cursor: 'pointer', color: 'var(--accent-9)', fontWeight: 500 }}>
                Raw model output
              </summary>
              <ScrollArea type="auto" style={{ maxHeight: 180, marginTop: 8 }}>
                <Card style={{ background: 'var(--accent-3)', borderRadius: 8, padding: 12, color: 'var(--accent-12)', fontSize: 14 }}>
                  {result.probabilities &&
                    Object.entries(result.probabilities).map(([label, prob]) => (
                      <div key={label}>
                        <Text color="accent">{label}</Text>:{' '}
                        <Text color="accent">{(prob * 100).toFixed(2)}%</Text>
                      </div>
                    ))}
                </Card>
              </ScrollArea>
            </details>
          </Card>
        )}
        <style>
          {`
            ::selection {
              background: var(--accent-9);
              color: #fff;
            }
          `}
        </style>
      </Card>
    </Flex>
  );
}
