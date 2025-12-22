import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss',
})
export class Admission {
  classes: any[] = [
    { className: 'Nursery', classNameValue: 'nursery' },
    { className: 'LKG', classNameValue: 'lkg' },
    { className: 'UKG', classNameValue: 'ukg' },
    { className: '1st', classNameValue: '1st' },
    { className: '2nd', classNameValue: '2nd' },
    { className: '3rd', classNameValue: '3rd' },
    { className: '4th', classNameValue: '4th' },
    { className: '5th', classNameValue: '5th' },
    { className: '6th', classNameValue: '6th' },
    { className: '7th', classNameValue: '7th' },
    { className: '8th', classNameValue: '8th' },
    { className: '9th', classNameValue: '9th' },
    { className: '10th', classNameValue: '10th' },
    { className: '11th', classNameValue: '11th' },
    { className: '12th', classNameValue: '12th' },
  ];

  admissionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.admissionForm = this.fb.group({
      // Student details form group
      studentDetails: this.fb.group({
        studentName: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        age: ['', Validators.required],
        bloodGroup: ['', Validators.required],
        religion: ['', Validators.required],
        nationality: ['', Validators.required],
        casteCategory: ['', Validators.required],
        motherTongue: ['', Validators.required],
        adhaar: ['', Validators.required],
      }),

      // Admission details form group
      admissionDetails: this.fb.group({
        admissionClass: ['', Validators.required],
        academicYear: ['', Validators.required],
        prevSchool: [''],
        reasonLeaving: [''],
      }),

      // Father details form group
      father: this.fb.group({
        fatherName: ['', Validators.required],
        fatherQualification: ['', Validators.required],
        fatherOccupation: ['', Validators.required],
        fatherOffice: [''],
        fatherContact: ['', Validators.required],
        fatherEmail: [''],
        fatherAdhaar: ['', Validators.required],
      }),

      // mother details form group
      mother: this.fb.group({
        motherName: ['', Validators.required],
        motherQualification: ['', Validators.required],
        motherOccupation: ['', Validators.required],
        motherOffice: [''],
        motherContact: ['', Validators.required],
        motherEmail: [''],
        motherAdhaar: ['', Validators.required],
      }),
      guardian: this.fb.group({
        guardianName: [''],
        guardianRelation: [''],
        guardianContact: [''],
        guardianAddress: [''],
      }),
      addressDetail: this.fb.group({
        presentAddress: ['', Validators.required],
        permanentAddress: ['', Validators.required],
        emergencyContact: ['', Validators.required],
        altContact: ['', Validators.required],
      }),
      documents: this.fb.group({
        studentPhoto: [null, Validators.required],
      }),
      declaration: this.fb.group({
        agree: [false, Validators.required],
        declarationDate: ['', Validators.required],
      }),
    });
  }

  copyAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    const present = this.admissionForm.get('addressDetail.presentAddress');
    const permanent = this.admissionForm.get('addressDetail.permanentAddress');

    if (isChecked && present) {
      permanent?.setValue(present.value);
      permanent?.disable();
    } else {
      permanent?.setValue('');
    }
  }

  generatePDF() {
    // console.log("PDF generated")
    // console.log(this.admissionForm.value)
    const content = document.getElementById('pdf');

    if (content) {
      html2canvas(content).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('admission-form.pdf');
      });
    }
  }
}
