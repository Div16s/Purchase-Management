import { jsPDF } from 'jspdf';
import { useEffect } from 'react';


function SP_101_PDF_URL_Generator({ forms, formId, department, onPdfGenerated }) {
    // Function to generate PDF
    const generatePdf = (formData) => {
        const doc = new jsPDF({ orientation: "p", lineHeight: 1 });
        const userName = formData.name;
        const dept = formData.department;
        const defaultSignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
        let facultySignature = defaultSignature;
        let hodSignature = defaultSignature;
        let JAOSignature = defaultSignature;
        let ACCOUNTANTSignature = defaultSignature;
        let AOSignature = defaultSignature;
        let AccARSignature = defaultSignature;
        let AccDRSignature = defaultSignature;
        let AccJRSignature = defaultSignature;
        let JSSignature = defaultSignature;
        let PurARSignature = defaultSignature;
        let PurDRSignature = defaultSignature;
        let PurJRSignature = defaultSignature;
        let RegistrarSignature = defaultSignature;

        if (formData.signatures) {
            const required_signature = formData.signatures.filter((sign) => (sign.role === "FACULTY"));
            const signature = required_signature[0].signature;
            if (typeof signature === "string" && (
                signature.startsWith("data:image/png") ||
                signature.startsWith("data:image/jpeg") ||
                signature.startsWith("data:image/jpg")
            )) {
                facultySignature = signature;
            }
        }
        if (formData.signatures) {
            const required_signature = formData.signatures.filter((sign) => (sign.role === "HOD"));
            if (required_signature.length > 0) {
                const signature = required_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    hodSignature = signature;
                }
            }
        }
        if (formData.signatures) {
            const required_signature = formData.signatures.filter((sign) => (sign.role === "JAO"));
            if (required_signature.length > 0) {
                const signature = required_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    JAOSignature = signature;
                }
            }
        }
        if (formData.signatures) {
            const required_signature = formData.signatures.filter((sign) => (sign.role === "ACCOUNTANT"));
            if (required_signature.length > 0) {
                const signature = required_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    ACCOUNTANTSignature = signature;
                }
            }
        }
        if (formData.signatures) {
            const required_signature = formData.signatures.filter((sign) => (sign.role === "AO"));
            if (required_signature.length > 0) {
                const signature = required_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    AOSignature = signature;
                }
            }
        }
        if (formData.signatures) {
            const acc_ar_signature = formData.signatures.filter((sign) => (sign.role === "AR" && sign.department === "ACC"));
            if (acc_ar_signature.length > 0) {
                const signature = acc_ar_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    AccARSignature = signature;
                }
            }

            const acc_dr_signature = formData.signatures.filter((sign) => (sign.role === "DR" && sign.department === "ACC"));
            if (acc_dr_signature.length > 0) {
                const signature = acc_dr_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    AccDRSignature = signature;
                    console.log("AccDRSignature", AccDRSignature);
                }
            }

            const acc_jr_signature = formData.signatures.filter((sign) => (sign.role === "JR" && sign.department === "ACC"));
            if (acc_jr_signature.length > 0) {
                const signature = acc_jr_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    AccJRSignature = signature;
                }
            }
        }

        if (formData.signatures) {
            const pur_js_signature = formData.signatures.filter((sign) => (sign.role === "JS" && sign.department === "PUR"));
            if (pur_js_signature.length > 0) {
                const signature = pur_js_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    JSSignature = signature;
                }
            }

            const pur_ar_signature = formData.signatures.filter((sign) => (sign.role === "AR" && sign.department === "PUR"));
            if (pur_ar_signature.length > 0) {
                const signature = pur_ar_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    PurARSignature = signature;
                }
            }

            const pur_dr_signature = formData.signatures.filter((sign) => (sign.role === "DR" && sign.department === "PUR"));
            if (pur_dr_signature.length > 0) {
                const signature = pur_dr_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    PurDRSignature = signature;
                }
            }

            const pur_jr_signature = formData.signatures.filter((sign) => (sign.role === "JR" && sign.department === "PUR"));
            if (pur_jr_signature.length > 0) {
                const signature = pur_jr_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    PurJRSignature = signature;
                }
            }
        }
        if (formData.signatures) {
            const registrar_signature = formData.signatures.filter((sign) => (sign.role === "REGISTRAR"));
            if (registrar_signature.length > 0) {
                const signature = registrar_signature[0].signature;
                if (typeof signature === "string" && (
                    signature.startsWith("data:image/png") ||
                    signature.startsWith("data:image/jpeg") ||
                    signature.startsWith("data:image/jpg")
                )) {
                    RegistrarSignature = signature;
                }
            }
        }

        let bool = 1;
        if (bool === 0) return;
        const val = 4;

        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        doc.setFont('times');
        doc.setFontSize(10);
        doc.text("INDIAN INSTITUTE OF TECHNOLOGY, ROPAR", pageWidth / 2, 10, { align: 'center' })
        doc.line(pageWidth - 20, 11, 20, 11)
        doc.setFont('times', 'bold')
        doc.setFontSize(9);
        doc.text('SPS-101', pageWidth - 31, 5)
        doc.line(pageWidth - 20, 5.5, pageWidth - 31, 5.5)
        doc.setFontSize(10);

        doc.setFont('times', 'normal')
        doc.text("File No.", 21, 15)
        {
            formData.purchaseSection &&
            doc.text(`${formData.purchaseSection.fileNo}`, 35, 15)
        }
        doc.text('Dated: ', pageWidth - 55, 15)
        var today = new Date();

        const month = (today.getMonth()) + 1;
        if (today.getMonth() + 1 < 10) {
            doc.text('0' + month, pageWidth - 34, 15.3);
        }
        else {
            doc.text(month, pageWidth - 34, 15.3);
        }

        doc.text(today.getDate() + '', pageWidth - 42.5, 15.3);
        doc.text(today.getFullYear() + '', pageWidth - 28, 15.3);
        doc.text('.', pageWidth - 36, 15.5);
        doc.text('.', pageWidth - 30, 15.5);
        doc.line(pageWidth - 36, 16, pageWidth - 45, 16);
        doc.line(pageWidth - 30, 16, pageWidth - 35, 16);
        doc.line(pageWidth - 20, 16, pageWidth - 29, 16);

        doc.setFont('times', 'bold')
        doc.text('Indent for Purchases below Rs.25000', pageWidth / 2, 18, { align: 'center' })
        doc.line(pageWidth / 2 + 28, 18.5, pageWidth / 2 - 28, 18.5)
        //top horizontal line
        doc.line(pageWidth - 19, 19, 19, 19)
        //leftmost vertical line
        doc.line(19, 19, 19, 134.8)
        //rightmost vertical line
        doc.line(pageWidth - 19, 19, pageWidth - 19, 134.8)
        //Middle vertical line
        doc.line(94, 19, 94, 70.5)

        doc.text(`Indenter's Name and Deptt.: `, 21, 22.5, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 24, 19, 24)



        doc.text(`${userName} ${dept} `, 150, 22.5, { align: 'right' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 24, 19, 24)


        doc.setFont('times', 'bold')
        doc.text(`Budget Head & Sanctioned Budget:  `, 21, 27.5, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 29, 19, 29)
        doc.text(`${formData && formData.budgetHead} & ${formData && formData.sanctionedBudget} `, 150, 27.5, { align: 'right' })
        doc.setFont('times', 'bold')
        doc.text(`Name of the Item(Attach list in case the no of) `, 21, 33, { align: 'left' })
        doc.text(`items are more): `, 21, 36, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 37.5, 19, 37.5)

        doc.setFont('times', 'bold')
        doc.text(`Approx cost: `, 21, 41, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 42.5, 19, 42.5)
        doc.text(`${formData && formData.approxCost}`, 150, 41, { align: 'right' })

        doc.setFont('times', 'bold')
        doc.text(`Category: `, 21, 46, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 47.5, 19, 47.5)
        doc.text(` ${formData && formData.category} `, 150, 46, { align: 'left' })

        doc.setFont('times', 'bold')
        doc.text(`Budgetary Approval Enclosed: `, 21, 51, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 52.5, 19, 52.5)
        doc.text(`${formData && formData.budgetaryApprovalEnclosed}`, 150, 51, { align: 'left' })

        doc.setFont('times', 'bold')
        doc.text(`Certified that the space is ready for`, 21, 56, { align: 'left' })
        doc.text(`installation of the equipment in`, 21, 60, { align: 'left' })
        doc.text(`Deptt/Centre/Unit on its arrival:-`, 21, 64, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 65.5, 19, 65.5)
        doc.text(`${formData && formData.readyForInstallation}`, 150, 60, { align: 'left' })

        doc.setFont('times', 'bold')
        doc.text(`Is Goods are required for Research Purpose: `, 21, 69, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 70.5, 19, 70.5)
        doc.text(`${formData && formData.readyForInstallation}`, 150, 69, { align: 'left' })
        doc.setFont('times', 'bold')


        doc.text("If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017", 21, 74, { align: 'left' })
        doc.text("& 47/2017: ", 21, 78, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.text("Certified that purchase of above goods for which concessional GST is claimed is required for research", 40, 78, { align: 'left' })
        doc.text("purpose only.", 21, 82, { align: 'left' })
        doc.line(pageWidth - 19, 83.5, 19, 83.5)

        doc.setFont('times', 'bold')
        doc.text(`GeM Purchase: `, 21, 87, { align: 'left' })
        doc.text(`${formData && formData.GEM}`, 150, 87, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 88.5, 19, 88.5)
        doc.line(94, 83.5, 94, 88.5)

        doc.text("*", 21, 92)
        doc.text("If available on GeM, specifications of the item as available on the GeM are attached. In case of non-availability of", 27, 92, { align: 'left' })
        doc.text("the items on the GeM, GeMAR&PTS ID attached.", 27, 96, { align: 'left' })
        doc.line(pageWidth - 19, 97.5, 19, 97.5)

        doc.setFont('times', 'bold')
        doc.text(`Recommendations of the Indenter (If required,seperate sheet can be attached for detailed specifications): `, 21, 101, { align: 'left' })
        doc.line(pageWidth - 19, 102.5, 19, 102.5)

        doc.setFont('times', 'bold')
        doc.text(`Mode of Enquiry: `, 21, 106, { align: 'left' })
        doc.text(`${formData && formData.modeOfEnquiry}`, 150, 106, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 107.5, 19, 107.5)
        doc.line(94, 102.5, 94, 107.5)

        doc.setFont('times', 'bold')
        doc.text(`Number of Quotation(s) recieved: `, 21, 111, { align: 'left' })
        doc.text(`${formData && formData.numberOfQuotation}`, 150, 111, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 112.5, 19, 112.5)
        doc.line(94, 107.5, 94, 112.5)

        doc.text("The indenter recommends the purchase of the following items from", 21, 116)
        doc.setFont('times', 'bold')
        doc.text("M/s", 117.5, 116)
        doc.text(`${formData && formData.nameOfSupplier}`, 128.5, 116)
        doc.line(124, 117.5, 172, 117.5)
        doc.setFont('times', 'normal')

        doc.text('against', 174, 116)
        doc.text("quotation no: ", 21, 121.5)
        doc.text(`${formData && formData.quotationNumber}`, 42, 121.5)
        doc.line(42, 122.5, 77, 122.5)

        doc.setFont('times', 'bold')
        doc.text("dated", 79, 121.5)
        doc.text(`${formData && formData.date}`, 89, 121.5)
        // doc.text(`${}`, 79, 121.5)

        doc.line(89, 122.5, 117, 122.5)
        doc.setFont('times', 'normal')
        doc.text(".   Quotation(s) has have been signed by the", 119, 121.5)
        doc.text("committee members.", 21, 127)
        doc.line(pageWidth - 19, 128.5, 19, 128.5)


        doc.setFont('times', 'bold')
        doc.text(`S.no`, 21, 133, { align: 'left' })

        doc.text(`Description`, 65, 133, { align: 'left' })
        doc.text(`Qty.`, 108, 133, { align: 'left' })
        doc.text(`Rate(Rs.)`, 125, 133, { align: 'left' })
        doc.text(`Tax@`, 150, 133, { align: 'left' })
        doc.text('Amt(Rs.)', 170, 133, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 134.5, 19, 134.5)
        doc.line(30, 128.5, 30, 134.5)
        doc.line(105, 128.5, 105, 134.5)
        doc.line(120, 128.5, 120, 134.5)
        doc.line(145, 128.5, 145, 134.5)
        doc.line(165, 128.5, 165, 134.5)

        var ypos = 139;
        var ylinepos = 134.5;
        var flag = 0;
        var total = 0, total2 = 0;

        formData && formData.items.forEach((element, index, array) => {
            flag = 1;
            // Add column position for tax (assuming 100 units width)
            var taxColPos = 155;

            doc.text(index + 1 + '', 23, ypos, { align: 'left' });

            doc.text(element.itemDescription + '', 35, ypos, { align: 'left', maxWidth: 80 });
            doc.text(element.quantity + '', 110, ypos, { align: 'center' });
            doc.text(element.price + '', 132, ypos, { align: 'center' });
            //   doc.text(element.tax + '', 150, ypos, { align: 'center' });

            console.log(element);

            // Calculate tax amount (assuming tax is a percentage)
            var taxRate = element.tax / 100; // convert tax percentage to decimal
            var taxAmount = element.price * element.quantity * taxRate;

            // Update total variables considering tax
            //   total2 += element.price * element.quantity;
            total += element.price * element.quantity + taxAmount;

            var amtTotal = element.price * element.quantity + taxAmount;
            doc.text(amtTotal.toFixed(2) + '', 175, ypos, { align: 'center' });

            // Add text for tax amount in the new column
            doc.text(taxAmount.toFixed(2) + '', taxColPos, ypos, { align: 'center' });

            ypos += 10;
            // Draw vertical line separating tax column
            doc.line(19, ylinepos, 19, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(30, ylinepos, 30, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(105, ylinepos, 105, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(120, ylinepos, 120, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(145, ylinepos, 145, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(165, ylinepos, 165, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(pageWidth - 19, ylinepos, pageWidth - 19, Math.min(ylinepos + 10, pageHeight - 23))
            ylinepos += 10;
            if (ypos > pageHeight - 23) {

                doc.line(pageWidth - 19, ylinepos, 19, ylinepos)
                doc.addPage();
                ypos = 20;
                ylinepos = 15;
                doc.line(pageWidth - 19, ylinepos, 19, ylinepos)
            }

        })

        if (flag === 0) {
            doc.line(pageWidth - 19, ylinepos + 10, 19, ylinepos + 10)
            doc.line(19, ylinepos, 19, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(30, ylinepos, 30, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(115, ylinepos, 115, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(130, ylinepos, 130, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(155, ylinepos, 155, Math.min(ylinepos + 10, pageHeight - 23))
            doc.line(pageWidth - 19, ylinepos, pageWidth - 19, Math.min(ylinepos + 10, pageHeight - 23))
            ylinepos += 10
        }
        doc.line(pageWidth - 19, ylinepos, 19, ylinepos)
        doc.line(pageWidth - 19, ylinepos + 5, 19, ylinepos + 5)
        doc.line(19, ylinepos, 19, Math.min(ylinepos + 5, pageHeight - 23))
        doc.line(30, ylinepos, 30, Math.min(ylinepos + 5, pageHeight - 23))
        doc.line(155, ylinepos, 155, Math.min(ylinepos + 5, pageHeight - 23))
        doc.line(pageWidth - 19, ylinepos, pageWidth - 19, Math.min(ylinepos + 5, pageHeight - 23))
        // doc.line(pageWidth - 19, ylinepos + 10, 19, ylinepos + 10)

        doc.setFont('times', 'bold')
        doc.text('Total', 140, ylinepos + 4)
        doc.setFont('times', 'normal')

        doc.text((total === 0 ? '' : total.toFixed(2)) + '', 170, ylinepos + 4)

        doc.setFontSize(8);


        ypos = ylinepos + 15
        doc.setFontSize(10);
        if (pageHeight - ypos < 60) {
            doc.addPage();
            ypos = 15
            doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have`, 22, ypos)
            ypos += 5
            doc.text(`been purchased from a reliable supplier at a reasonable price."`, 22, ypos)
            ypos += 15
        }
        else if (pageHeight - ypos < 30) {
            doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have`, 22, ypos)
            ypos += 5
            doc.text(`been purchased from a reliable supplier at a reasonable price."`, 22, ypos)
            doc.addPage();
            ypos = 15
        }
        else {
            doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have been`, 22, ypos)
            ypos += 5
            doc.text(`purchased from a reliable supplier at a reasonable price."`, 22, ypos)
            ypos += 15
        }
        doc.setFont("times", 'bold')
        doc.text("Recommended Mode of Payment:", 21, ypos, { align: 'left' })
        doc.text(`${formData && formData.modeOfPayment}`, 80, ypos, { align: 'left' })
        doc.setFont("times", 'normal')
        ypos += 15
        doc.setFont("times", 'bold')
        doc.text("Delivery Period:", 21, ypos, { align: 'left' })
        doc.text(`${formData && formData.deliveryPeriod}`, 60, ypos, { align: 'left' })
        doc.addImage(facultySignature, 'PNG', 140, ypos, 50, 20);
        ypos += 25
        doc.text("Signature of the Indenter", 180, ypos, { align: 'right' })
        doc.setFont("times", 'bold')
        doc.addImage(hodSignature, 'PNG', 20, ypos, 50, 20);
        ypos += 25;
        doc.text("HOD/PI (for external projects only)", 21, ypos, { align: 'left' })
        ypos += 5
        doc.setFont("times", 'bold')

        if (pageHeight - ypos <= 60) {
            doc.addPage();
            ypos = 15;
        }


        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.text("For use by Budget Section", pageWidth / 2, ypos + 8.5, { align: 'center' })
        doc.line(pageWidth / 2 - 20, ypos + 9, pageWidth / 2 + 20, ypos + 9)
        doc.line(19, ypos + 5, 19, ypos + 55)
        doc.line(pageWidth - 19, ypos + 5, pageWidth - 19, ypos + 55)
        doc.line(19, ypos + 10, pageWidth - 19, ypos + 10)
        ypos += 10
        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.text("(Amount in Rs.)", pageWidth - 44, ypos + 4)
        ypos += 5
        doc.text("Budget Sanctioned", 21, ypos + 4)
        doc.setFont('times', 'normal')
        doc.text(`${formData && formData.sanctionedBudget}`, pageWidth - 44, ypos + 4)

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(75, ypos, 75, ypos + 40)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Budget Available", 21, ypos + 4)
        doc.setFont('times', 'normal')
        doc.text(`${formData.budgetSection ? formData.budgetSection.budgetAvailable : ""}`, 75, ypos + 4)

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Budget Booked", 21, ypos + 4)
        doc.setFont('times', 'normal')
        doc.text(`${formData.budgetSection ? formData.budgetSection.budgetBooked : ""}`, 75, ypos + 4)

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(130, ypos, 130, ypos + 5)
        doc.line(153, ypos, 153, ypos + 5)
        doc.setFont('times', 'bold')
        doc.text("Budget Head", 132, ypos + 4)
        doc.setFont('times', 'normal')
        doc.text(`${formData && formData.budgetHead}`, 155, ypos + 4)
        doc.setFontSize(8)

        doc.setFontSize(10)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Balance Budget", 21, ypos + 4)
        doc.setFont('times', 'normal')
        doc.text(`${formData.budgetSection ? formData.budgetSection.balanceBudget : ""}`, 75, ypos + 4)

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(130, ypos + 5, 130, ypos + 25)
        ypos += 5
        doc.line(19, ypos + 20, pageWidth - 19, ypos + 20)
        if (JAOSignature !== defaultSignature) {
            // Add JAO Signature
            doc.addImage(JAOSignature, 'PNG', 20, ypos, 50, 20);
            ypos += 25; // Move the position down for the text
            doc.setFont('times', 'bold');
            doc.text("Accountant/JAO", 21, ypos + 19); // Text for JAO
        } else if (ACCOUNTANTSignature !== defaultSignature) {
            // Add Accountant Signature if JAO Signature isn't provided
            doc.addImage(ACCOUNTANTSignature, 'PNG', 20, ypos, 50, 20);
            ypos += 25; // Move the position down for the text
            doc.setFont('times', 'bold');
            doc.text("Accountant", 21, ypos + 19); // Text for Accountant
        } else {
            doc.addImage(defaultSignature, 'PNG', 20, ypos, 50, 20);
            ypos += 25;
            doc.setFont('times', 'bold')
            doc.text("Accountant/JAO", 21, ypos + 19)
        }

        doc.addImage(AOSignature, 'PNG', 75, ypos - 25, 50, 20);
        doc.text("AO", 100, ypos + 19)

        if (AccARSignature !== defaultSignature) {
            doc.addImage(AccARSignature, 'PNG', 135, ypos - 25, 50, 20);
            doc.text("AR, Accounts", pageWidth - 55, ypos + 19);
        } else if (AccDRSignature !== defaultSignature) {
            doc.addImage(AccDRSignature, 'PNG', 135, ypos - 25, 50, 20);
            doc.text("DR, Accounts", pageWidth - 55, ypos + 19);
        } else if (AccJRSignature !== defaultSignature) {
            doc.addImage(AccJRSignature, 'PNG', 135, ypos - 25, 50, 20);
            doc.text("JR, Accounts", pageWidth - 55, ypos + 19);
        } else {
            doc.addImage(defaultSignature, 'PNG', 135, ypos - 25, 50, 20);
            doc.text("AR/JR/DR, Accounts", pageWidth - 55, ypos + 19);
        }

        doc.addPage()

        doc.setFont('times', 'bold')
        doc.text("For use by the Purchase Section", pageWidth / 2, 13, { align: 'center' })
        doc.line(pageWidth / 2 - 24, 13.5, pageWidth / 2 + 24, 13.5)

        doc.setFont('times', 'normal')
        doc.text("Quotation signed by all the committee members. Calculations indicated above have been checked and found in order.", 23, 20, { maxWidth: pageWidth - 37 })
        doc.text(`Purchase proposal (Page no. ${formData.purchaseSection ? formData.purchaseSection.startPageNo : "_____"} to ${formData.purchaseSection ? formData.purchaseSection.endPageNo : "_____"}) is in order. The Competent Financial Authority (CFA) may kindly`, 23, 26, { maxWidth: pageWidth - 37 })
        doc.text(`accord financial sanction to the extent of Rs. ${formData.purchaseSection ? formData.purchaseSection.rsInValue : "_____________"} (Rupees ${formData.purchaseSection ? formData.purchaseSection.rsInWords : "______________"} only)`, 23, 32, { maxWidth: pageWidth - 37 })
        doc.text("for the above purchase.", 23, 38, { maxWidth: pageWidth - 37 })


        doc.setFont('times', 'bold')
        console.log("JSSignature ",JSSignature);
        doc.addImage(JSSignature, 'PNG', 10, ypos - 35, 50, 20);
        doc.text('J.S./Supdt (P)', 23, 60)

        if (PurARSignature !== defaultSignature) {
            doc.addImage(PurARSignature, 'PNG', 160, ypos - 40, 50, 20);
            doc.text('AR, Purchase', pageWidth - 39, 60)
        } else if (PurDRSignature !== defaultSignature) {
            doc.addImage(PurDRSignature, 'PNG', 160, ypos - 40, 50, 20);
            doc.text('DR, Purchase', pageWidth - 39, 60)
        } else if (PurJRSignature !== defaultSignature) {
            doc.addImage(PurJRSignature, 'PNG', 160, ypos - 40, 50, 20);
            doc.text('JR, Purchase', pageWidth - 39, 60)
        } else {
            doc.addImage(PurDRSignature, 'PNG', 160, ypos - 40, 50, 20);
            doc.text('AR/DR/JR', pageWidth - 39, 60)
        }

        if(formData.approvedBy=="REGISTRAR" || formData.approvedBy=="FINAL_HOD"){
            doc.text('Recommended', 23, 70);
        }else{
            doc.text('Recommended / Not Recommended', 23, 70);
        }

        if(formData.approvedBy=="FINAL_HOD"){
            doc.text('Approved', pageWidth - 40, 70);
        }else{
            doc.text('Approved / Not Approved', pageWidth - 60, 70);
        }


        doc.addImage(RegistrarSignature, 'PNG', 10, ypos + 2, 50, 20);
        doc.text('REGISTRAR', 23, 100)
        doc.addImage(hodSignature, 'PNG', 158, ypos, 50, 20);
        doc.text('HOD', pageWidth - 31, 100)


        doc.text("Instructions", pageWidth / 2, 110, { align: 'center' })

        doc.setFont('times', 'normal')

        doc.setFontSize(10)
        doc.text(`1. The Purchase committees may be constituted as per Store and Purchase manual's Rule No. 7 before initializing the `, 23, 125, { maxWidth: pageWidth - 37 })
        doc.text("purchase in order to effect this purchase. The relevant provision for constitution committee can be assessed at Store and ", 23, 130, { maxWidth: pageWidth - 37 })
        doc.text('Purchase website: ', 23, 135)
        doc.setTextColor(0, 0, 255)
        doc.setDrawColor(0, 0, 255)
        doc.textWithLink('www.iitrpr.ac.in', 50, 135, { url: 'www.iitrpr.ac.in' })
        doc.line(50, 135.4, 73, 135.4)
        doc.setDrawColor(0, 0, 0)
        doc.setTextColor(0, 0, 0)


        doc.text(`2. As per this Office Memorandum No.F.1/26//2018-PPD dated.02.04.2019 received from the Ministry of Finance,`, 23, 150, { maxWidth: pageWidth - 37 })
        doc.text("Department of Expenditure, Procurement Policy Division that Common Use Goods and Services are to be procured ", 23, 155, { maxWidth: pageWidth - 37 })
        doc.text('mandatorily through GeM as per GFR Rule 147 & 149 and institute office order No.1412-19/ADMN-GeM/PS/487', 23, 160)
        doc.text("dt.05.02.2020.", 23, 165)

        doc.text(`3. The procurement of the second laptop from the Department Fund subject to the circular no. Reg-1/2018/IITRPR/167`, 23, 180, { maxWidth: pageWidth - 37 })
        doc.text("dated 31.08.2018. As per circular, the faculty member can procure second laptop only after four years of first procurement ", 23, 185, { maxWidth: pageWidth - 37 })
        doc.text("irrespective of the source of funding like institute/CPDA. This will not be applicable on the procurement of laptops from", 23, 190, { maxWidth: pageWidth - 37 })
        doc.text("the projects.", 23, 195, { maxWidth: pageWidth - 37 })

        doc.text(`4. All the purchases of furniture should be done through Store and Purchase Section as per the circular no. 752 dated `, 23, 210, { maxWidth: pageWidth - 37 })
        doc.text("17.02.2020.", 23, 215, { maxWidth: pageWidth - 37 })

        doc.addPage();
        doc.setFont('times', 'bold')
        doc.setFontSize(16)
        doc.text(" GeMAR Details", pageWidth / 2 - 20, 15)
        doc.line(pageWidth / 2 - 20, 15.7, pageWidth / 2 + 20, 15.7)
        doc.setFont('times', 'normal')
        doc.setFontSize(14)
        // doc.text(`${formData.gemarDetails}`,pageWidth / 2 - 20,20)
        doc.setFont('times', 'bold')
        doc.setFontSize(16)
        doc.text(" PTS ID", pageWidth / 2 - 10, 55)
        doc.line(pageWidth / 2 - 10, 55.7, pageWidth / 2 + 10, 55.7)
        doc.setFontSize(12)
        doc.setFont('times', 'normal')
        // doc.text(`${formData.ptsId}`,pageWidth / 2 - 10,60)
        doc.setFont('times', 'bold')
        doc.setFontSize(16)
        doc.text("Recommendations of the Indenter", pageWidth / 2 - 40, pageHeight / 2)
        doc.line(pageWidth / 2 - 40, pageHeight / 2 + 0.7, pageWidth / 2 + 43, pageHeight / 2 + 0.7)
        doc.setFontSize(12)
        doc.setFont('times', 'normal')
        bool = 0;

        // Save the PDF and obtain its URL
        const pdfUrl = doc.output('datauristring');
        onPdfGenerated(pdfUrl);
    }

    // Call the generatePdf function when the component mounts
    useEffect(() => {
        if (forms && Array.isArray(forms) && formId) {
            // Find the form data with the matching formId
            const formData = forms.find(form => form.id === formId);
            // If the form data is found, call generatePdf
            if (formData) {
                generatePdf(formData);
            }
        }
    }, [forms, formId]);
}

export default SP_101_PDF_URL_Generator;
