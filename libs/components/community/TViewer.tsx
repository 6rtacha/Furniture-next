import React, { useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { Box, Stack, CircularProgress } from '@mui/material';

const removeImagesFromHTML = (html: string): string => {
	if (!html) return '';
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const images = doc.querySelectorAll('img');
	images.forEach((img) => img.remove());
	return doc.body.innerHTML;
};

const TViewer = ({ markdown, sx }: { markdown: string; sx?: any }) => {
	const [editorLoaded, setEditorLoaded] = useState(false);

	useEffect(() => {
		setEditorLoaded(!!markdown);
	}, [markdown]);

	return (
		<Stack sx={{ background: 'white', borderRadius: '10px', ...sx }}>
			<Box component={'div'} sx={{ m: '40px' }}>
				{editorLoaded ? (
					<Viewer
						initialValue={removeImagesFromHTML(markdown)}
						className="toast-editor-viewer"
						customHTMLRenderer={{
							htmlBlock: {
								iframe(node: any) {
									return [
										{
											type: 'openTag',
											tagName: 'iframe',
											outerNewLine: true,
											attributes: node.attrs,
										},
										{ type: 'html', content: node.childrenHTML ?? '' },
										{ type: 'closeTag', tagName: 'iframe', outerNewLine: true },
									];
								},
								div(node: any) {
									return [
										{ type: 'openTag', tagName: 'div', outerNewLine: true, attributes: node.attrs },
										{ type: 'html', content: node.childrenHTML ?? '' },
										{ type: 'closeTag', tagName: 'div', outerNewLine: true },
									];
								},
							},
							htmlInline: {
								big(node: any, { entering }: any) {
									return entering
										? { type: 'openTag', tagName: 'big', attributes: node.attrs }
										: { type: 'closeTag', tagName: 'big' };
								},
							},
						}}
					/>
				) : (
					<CircularProgress />
				)}
			</Box>
		</Stack>
	);
};

export default TViewer;
