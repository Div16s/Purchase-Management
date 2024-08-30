import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const PurchaseForm = () => {
    const userInfoString = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfoString);
    const [formData, setFormData] = useState({
        indenterName: user.name,
        indenterDepartment: user.department,
        budgetHead: '',
        itemName: '',
        approxCost: '',
        category: '',
        budgetaryApproval: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generatePDF(formData);
    };

    const generatePDF = (data) => {
        const doc = new jsPDF({ orientation: "p", lineHeight: 1 });
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
        doc.text('Dated: ', pageWidth - 55, 15)
        var today = new Date();

        if (today.getMonth() + 1 < 10) {
            doc.text('0' + today.getMonth(), pageWidth - 34, 15.3);
        }
        else {
            doc.text(today.getMonth(), pageWidth - 34, 15.3);
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

        doc.text(`Indenter's Name and Department: `, 21, 22.5, { align: 'left' })
        // For empty field in the right column
        doc.text(data.indenterName, 130, 22.5);
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 24, 19, 24)

        doc.setFont('times', 'bold')
        doc.text(`Budget Head & Sanctioned Budget: `, 21, 27.5, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 29, 19, 29)

        doc.setFont('times', 'bold')
        doc.text(`Name of the Item(Attach list in case the no of) `, 21, 33, { align: 'left' })
        doc.text(`items are more): `, 21, 36, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 37.5, 19, 37.5)

        doc.setFont('times', 'bold')
        doc.text(`Approx cost: `, 21, 41, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 42.5, 19, 42.5)

        doc.setFont('times', 'bold')
        doc.text(`Category: `, 21, 46, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 47.5, 19, 47.5)

        doc.setFont('times', 'bold')
        doc.text(`Budgetary Approval Enclosed: `, 21, 51, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 52.5, 19, 52.5)

        doc.setFont('times', 'bold')
        doc.text(`Certified that the space is ready for`, 21, 56, { align: 'left' })
        doc.text(`installation of the equipment in`, 21, 60, { align: 'left' })
        doc.text(`Deptt/Centre/Unit on its arrival:-`, 21, 64, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 65.5, 19, 65.5)

        doc.setFont('times', 'bold')
        doc.text(`Is Goods are required for Research Purpose: `, 21, 69, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 70.5, 19, 70.5)

        doc.setFont('times', 'bold')
        doc.text("If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017", 21, 74, { align: 'left' })
        doc.text("& 47/2017: ", 21, 78, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.text("Certified that purchase of above goods for which concessional GST is claimed is required for research", 40, 78, { align: 'left' })
        doc.text("purpose only.", 21, 82, { align: 'left' })
        doc.line(pageWidth - 19, 83.5, 19, 83.5)

        doc.setFont('times', 'bold')
        doc.text(`GeM Purchase: `, 21, 87, { align: 'left' })
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
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 107.5, 19, 107.5)
        doc.line(94, 102.5, 94, 107.5)

        doc.setFont('times', 'bold')
        doc.text(`Number of Quotation(s) recieved: `, 21, 111, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 112.5, 19, 112.5)
        doc.line(94, 107.5, 94, 112.5)

        doc.text("The indenter recommends the purchase of the following items from", 21, 116)
        doc.setFont('times', 'bold')
        doc.text("M/s", 117.5, 116)
        doc.line(124, 117.5, 172, 117.5)
        doc.setFont('times', 'normal')

        doc.text('against', 174, 116)
        doc.text("quotation no: ", 21, 121.5)
        doc.line(42, 122.5, 77, 122.5)

        doc.setFont('times', 'bold')
        doc.text("dated", 79, 121.5)
        doc.line(89, 122.5, 117, 122.5)
        doc.setFont('times', 'normal')
        doc.text(".   Quotation(s) has have been signed by the", 119, 121.5)
        doc.text("committee members.", 21, 127)
        doc.line(pageWidth - 19, 128.5, 19, 128.5)


        doc.setFont('times', 'bold')
        doc.text(`S.no`, 21, 133, { align: 'left' })

        doc.text(`Description`, 65, 133, { align: 'left' })
        doc.text(`Qty.`, 120, 133, { align: 'left' })
        doc.text(`Rate(Rs.)`, 135, 133, { align: 'left' })
        doc.text('Amt(Rs.)', 165, 133, { align: 'left' })
        doc.setFont('times', 'normal')
        doc.line(pageWidth - 19, 134.5, 19, 134.5)
        doc.line(30, 128.5, 30, 134.5)
        doc.line(115, 128.5, 115, 134.5)
        doc.line(130, 128.5, 130, 134.5)
        doc.line(155, 128.5, 155, 134.5)

        var ypos = 139;
        var ylinepos = 134.5
        var flag = 0
        var total = 0, total2 = 0

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
        doc.line(19, ylinepos, 19, Math.min(ylinepos + 10, pageHeight - 23))
        doc.line(30, ylinepos, 30, Math.min(ylinepos + 10, pageHeight - 23))
        doc.line(155, ylinepos, 155, Math.min(ylinepos + 10, pageHeight - 23))
        doc.line(pageWidth - 19, ylinepos, pageWidth - 19, Math.min(ylinepos + 10, pageHeight - 23))
        doc.line(pageWidth - 19, ylinepos + 10, 19, ylinepos + 10)
        doc.text('Tax@__', 140, ylinepos + 4)
        doc.setFont('times', 'bold')
        doc.text('Total', 144, ylinepos + 9)
        doc.setFont('times', 'normal')

        doc.text((total === 0 ? '' : total.toFixed(2)) + '', 170, ylinepos + 8.5)

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
        doc.setFont("times", 'normal')
        ypos += 15
        doc.setFont("times", 'bold')
        doc.text("Delivery Period:", 21, ypos, { align: 'left' })
        doc.setFont("times", 'normal')
        ypos += 15
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

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(75, ypos, 75, ypos + 40)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Budget Available", 21, ypos + 4)
        doc.setFont('times', 'normal')

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Budget Booked", 21, ypos + 4)
        doc.setFont('times', 'normal')

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(130, ypos, 130, ypos + 5)
        doc.line(153, ypos, 153, ypos + 5)
        doc.setFont('times', 'bold')
        doc.text("Budget Head", 132, ypos + 4)
        doc.setFont('times', 'normal')
        doc.setFontSize(8)

        doc.setFontSize(10)
        ypos += 5
        doc.setFont('times', 'bold')
        doc.text("Balance Budget", 21, ypos + 4)
        doc.setFont('times', 'normal')

        doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
        doc.line(130, ypos + 5, 130, ypos + 25)
        ypos += 5
        doc.line(19, ypos + 20, pageWidth - 19, ypos + 20)
        doc.setFont('times', 'bold')
        doc.text("Accountant/JAO", 21, ypos + 19)

        doc.text("AO", 100, ypos + 19)

        doc.text("AR/JR/DR, Accounts", pageWidth - 55, ypos + 19)

        doc.addPage()

        doc.setFont('times', 'bold')
        doc.text("For use by the Purchase Section", pageWidth / 2, 13, { align: 'center' })
        doc.line(pageWidth / 2 - 24, 13.5, pageWidth / 2 + 24, 13.5)

        doc.setFont('times', 'normal')
        doc.text("Quotation signed by all the committee members. Calculations indicated above have been checked and found in order.", 23, 20, { maxWidth: pageWidth - 37 })
        doc.text("Purchase proposal (Page no.______to_______) is in order. The Competent Financial Authority (CFA) may kindly", 23, 26, { maxWidth: pageWidth - 37 })
        doc.text("accord financial sanction to the extent of Rs. ________________(Rupees _____________________________only)", 23, 32, { maxWidth: pageWidth - 37 })
        doc.text("for the above purchase.", 23, 38, { maxWidth: pageWidth - 37 })


        doc.setFont('times', 'bold')
        doc.text('J.S./Supdt (P)', 23, 60)
        doc.text('AR/DR/JR', pageWidth - 39, 60)
        doc.text('Recommended/Not Recommended', 23, 70)
        doc.text('Approved/Not Approved', pageWidth - 60, 70)

        doc.text('REGISTRAR', 23, 100)
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
        doc.text("GEM details or GeMAR & PTS ID", pageWidth / 2 - 40, 15)
        doc.line(pageWidth / 2 - 40, 15.7, pageWidth / 2 + 43, 15.7)
        doc.setFontSize(12)
        doc.setFont('times', 'normal')

        doc.setFont('times', 'bold')
        doc.setFontSize(16)
        doc.text("Recommendations of the Indenter", pageWidth / 2 - 40, pageHeight / 2)
        doc.line(pageWidth / 2 - 40, pageHeight / 2 + 0.7, pageWidth / 2 + 43, pageHeight / 2 + 0.7)
        doc.setFontSize(12)
        doc.setFont('times', 'normal')

        doc.save("SP101.pdf");
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="indenterName">
                        Indenter's Name and Deptt.
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="indenterName"
                        type="text"
                        placeholder="Enter indenter's name"
                        name="indenterName"
                        value={formData.indenterName}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="indenterName">
                        Department
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="indenterName"
                        type="text"
                        placeholder="Enter indenter's name"
                        name="indenterName"
                        value={formData.indenterDepartment}
                    />
                </div>
                {/* Other form fields */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Generate PDF
                </button>
            </form>
        </div>
    );
};

export default PurchaseForm;
