import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography, Paper } from '@mui/material';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { useMutation } from '@apollo/client';
import { CREATE_NOTICE } from '../../../apollo/admin/mutation';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeInput } from '../../../libs/types/notice/notice.input';
import { sweetConfirmAlert, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';

const initialFormData: NoticeInput = {
	noticeCategory: NoticeCategory.EVENT,
	noticeStatus: NoticeStatus.ACTIVE,
	noticeTitle: '',
	noticeContent: '',
};

const AddNotice: React.FC = () => {
	const [formData, setFormData] = useState<NoticeInput>(initialFormData);
	const [createNotice] = useMutation(CREATE_NOTICE);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await createNotice({
				variables: {
					input: formData,
				},
			});
			console.log('Notice created:', data.createNotice);
			setFormData(initialFormData); // Reset form after creation
			await sweetMixinSuccessAlert('Notice is created');
		} catch (error) {
			console.error('Error creating notice:', error);
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
			<Typography variant="h5" mb={3} textAlign="center">
				Create Notice
			</Typography>
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					select
					label="Notice Category"
					name="noticeCategory"
					value={formData.noticeCategory}
					onChange={handleChange}
					fullWidth
					margin="normal"
					required
				>
					<MenuItem value="FAQ">FAQ</MenuItem>
					<MenuItem value="TERMS">Terms</MenuItem>
					<MenuItem value="INQUIRY">Inquiry</MenuItem>
					<MenuItem value="EVENT">Event</MenuItem>
					<MenuItem value="UPDATE">Update</MenuItem>
					<MenuItem value="IMPORTANT">Important</MenuItem>
				</TextField>

				<TextField
					select
					label="Notice Status"
					name="noticeStatus"
					value={formData.noticeStatus}
					onChange={handleChange}
					fullWidth
					margin="normal"
					required
				>
					<MenuItem value="ACTIVE">Active</MenuItem>
					<MenuItem value="HOLD">Inactive</MenuItem>
					<MenuItem value="DELETE">Delete</MenuItem>
				</TextField>

				<TextField
					label="Notice Title"
					name="noticeTitle"
					value={formData.noticeTitle}
					onChange={handleChange}
					fullWidth
					margin="normal"
					required
				/>

				<TextField
					label="Notice Content"
					name="noticeContent"
					value={formData.noticeContent}
					onChange={handleChange}
					fullWidth
					margin="normal"
					required
					// multiline
					// rows={5}
					// sx={{ whiteSpace: 'pre-wrap' }} // Fix overflow
				/>

				<Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
					Create Notice
				</Button>
			</Box>
		</Paper>
	);
};

export default withAdminLayout(AddNotice);
