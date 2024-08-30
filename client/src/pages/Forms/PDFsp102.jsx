import React, { useEffect } from 'react'
import jsPDF from 'jspdf';

const PDFsp102 = (data,budgetData) => {
    
    const doc = new jsPDF({ orientation: "p", lineHeight: 1 });
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    
    
    doc.setFont('times');
    doc.setFontSize(10);
    doc.text("INDIAN INSTITUTE OF TECHNOLOGY, ROPAR", pageWidth / 2, 10, { align: 'center' })
    doc.line(pageWidth - 20, 11, 20, 11)
    
    
    doc.setFont('times', 'bold')
    doc.setFontSize(9);
    doc.text('SPS-102', pageWidth - 31, 5)
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
    doc.text('Indent for Purchases from Rs.25000 to Rs.1.00 Lac', pageWidth / 2, 19, { align: 'center' })
    doc.line(pageWidth / 2 + 38.2, 19.5, pageWidth / 2 - 38.2, 19.5)
    doc.text("Part-A", pageWidth / 2, 23, { align: 'center' })
    //top horizontal line
    doc.line(pageWidth - 19, 26, 19, 26)
    //leftmost vertical line
    doc.line(19, 26, 19, 104.5)
    //rightmost vertical line
    doc.line(pageWidth - 19, 26, pageWidth - 19, 104.5)
    //Middle vertical line
    doc.line(94, 26, 94, 77.5)
    
    doc.text(`Indenter's Name and Deptt.: `, 21, 29.5, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 31, 19, 31)
    
    doc.setFont('times', 'bold')
    doc.text(`Budget Head & Sanctioned Budget: `, 21, 34.5, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 36, 19, 36)
    
    doc.setFont('times', 'bold')
    doc.text(`Name of the Item(Attach list in case the no of) `, 21, 40, { align: 'left' })
    doc.text(`items are more): `, 21, 43, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 44.5, 19, 44.5)
    
    doc.setFont('times', 'bold')
    doc.text(`Approx cost: `, 21, 48, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 49.5, 19, 49.5)
    
    doc.setFont('times', 'bold')
    doc.text(`Category: `, 21, 53, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 54.5, 19, 54.5)
    
    doc.setFont('times', 'bold')
    doc.text(`Budgetary Approval Enclosed: `, 21, 58, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 59.5, 19, 59.5)
    
    doc.setFont('times', 'bold')
    doc.text(`Certified that the space is ready for`, 21, 63, { align: 'left' })
    doc.text(`installation of the equipment in`, 21, 67, { align: 'left' })
    doc.text(`Deptt/Centre/Unit on its arrival:-`, 21, 71, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 72.5, 19, 72.5)
    
    doc.setFont('times', 'bold')
    doc.text(`Is Goods are required for Research Purpose: `, 21, 76, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 77.5, 19, 77.5)
    
    doc.setFont('times', 'bold')
    doc.text("If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017", 21, 81, { align: 'left' })
    doc.text("& 47/2017: ", 21, 85, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.text("Certified that purchase of above goods for which concessional GST is claimed is required for research", 40, 85, { align: 'left' })
    doc.text("purpose only.", 21, 89, { align: 'left' })
    doc.line(pageWidth - 19, 90.5, 19, 90.5)
    
    doc.setFont('times', 'bold')
    doc.text(`GeM Purchase: `, 21, 94, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 95.5, 19, 95.5)
    doc.line(94, 90.5, 94, 95.5)
    
    doc.text("*", 21, 99)
    doc.text("If available on GeM, specifications of the item as available on the GeM are attached. In case of non-availability of", 27, 99, { align: 'left' })
    doc.text("the items on the GeM, GeMAR&PTS ID attached.", 27, 103, { align: 'left' })
    doc.line(pageWidth - 19, 104.5, 19, 104.5)
    
    
    doc.line(pageWidth - 19, 110, 19, 110)
    //leftmost vertical line
    doc.line(19, 110, 19, 135)
    //rightmost vertical line
    doc.line(pageWidth - 19, 110, pageWidth - 19, 135)
    //Middle vertical line
    // doc.line(94, 26, 94, 77.5)
    
    
    doc.setFont('times', 'bold')
    doc.text("Proposed Committee:", 21, 113.5)
    doc.line(pageWidth - 19, 115, 19, 115)
    doc.setFont('times', 'normal')
    doc.text('S. No.', 21, 118.5)
    doc.text('Member of the Committee', 45, 118.5)
    doc.text('Name of the Faculty/Group A Officer', 110, 118.5)
    doc.line(19, 120, pageWidth - 19, 120)
    doc.line(43, 115, 43, 135)
    doc.line(108, 115, 108, 135)
    
    doc.text('01.', 21, 123.5)
    doc.text('Member-1 (Faculty/Group A Officers):', 45, 123.5)
    doc.line(19, 125, pageWidth - 19, 125)
    
    doc.text('02.', 21, 128.5)
    doc.text('Member-2 (Faculty/Group A Officers):', 45, 128.5)
    doc.line(19, 130, pageWidth - 19, 130)
    
    doc.text('03.', 21, 133.5)
    doc.text('Member-3 (Faculty/Group A Officers):', 45, 133.5)
    doc.line(19, 135, pageWidth - 19, 135)
    
    doc.setFont('times', 'bold')
    doc.text("INDENTER", 21, 155)
    doc.text("HOD", pageWidth - 27, 155)
    
    doc.text("Part-B (To be filled by Indenter only after approval of Part-A)", pageWidth / 2 + 5, 165, { align: 'center' })
    
    doc.line(19, 168, pageWidth - 19, 168)
    doc.line(19, 168, 19, 205)
    doc.line(pageWidth - 19, 168, pageWidth - 19, 205)
    
    doc.setFont('times', 'bold')
    doc.text(`Recommendations of the Indenter (If required,seperate sheet can be attached for detailed specifications): `, 21, 171.5, { align: 'left' })
    doc.line(pageWidth - 19, 173, 19, 173)
    
    doc.setFont('times', 'bold')
    doc.text(`Mode of Enquiry: `, 21, 176.5, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 178, 19, 178)
    doc.line(94, 173, 94, 178)
    
    doc.setFont('times', 'bold')
    doc.text(`Number of Quotation(s) recieved: `, 21, 181.5, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 183, 19, 183)
    doc.line(94, 178, 94, 183)
    
    doc.text("The indenter recommends the purchase of the following items from", 21, 186.5)
    doc.setFont('times', 'bold')
    doc.text("M/s", 117.5, 186.5)
    doc.line(124, 188, 172, 188)
    doc.setFont('times', 'normal')
    
    doc.text('against', 174, 186.5)
    doc.text("quotation no: ", 21, 192)
    doc.line(42, 193, 77, 193)
    
    doc.setFont('times', 'bold')
    doc.text("dated", 79, 192)
    doc.line(89, 193, 117, 193)
    doc.setFont('times', 'normal')
    doc.text(".   Quotation(s) has have been signed by the", 119, 192)
    doc.text("committee members.", 21, 197.5)
    doc.line(pageWidth - 19, 199, 19, 199)
    
    doc.setFont('times', 'bold')
    doc.text(`S.no`, 21, 203.5, { align: 'left' })
    
    doc.text(`Description`, 65, 203.5, { align: 'left' })
    doc.text(`Qty.`, 120, 203.5, { align: 'left' })
    doc.text(`Rate(Rs.)`, 135, 203.5, { align: 'left' })
    doc.text('Amt(Rs.)', 165, 203.5, { align: 'left' })
    doc.setFont('times', 'normal')
    doc.line(pageWidth - 19, 205, 19, 205)
    doc.line(30, 199, 30, 205)
    doc.line(115, 199, 115, 205)
    doc.line(130, 199, 130, 205)
    doc.line(155, 199, 155, 205)
    
    var ypos = 209.5;
    var ylinepos = 205;
    var flag = 0
    var total = 0
    
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
    
    
    doc.setFontSize(8);
    
    ypos = ylinepos + 15
    doc.setFontSize(10);
    if (pageHeight - ypos < 60) {
        doc.addPage();
        ypos = 15
        doc.text(`"It is certified that we the undersigned purchase committee members are jointly and individually satisfied that the`, 22, ypos)
        ypos += 5
        doc.text(`recommended items are of requisite specifications and quality, prices are according to the prevailing market rates and`, 22, ypos)
        ypos += 5
        doc.text(`the supplier recommended is reliable and competent to supply the goods in question".`, 22, ypos)
        ypos += 4
    }
    else if (pageHeight - ypos < 30) {
        doc.text(`"It is certified that we the undersigned purchase committee members are jointly and individually satisfied that the`, 22, ypos)
        ypos += 5
        doc.text(`recommended items are of requisite specifications and quality, prices are according to the prevailing market rates and`, 22, ypos)
        ypos += 5
        doc.text(`the supplier recommended is reliable and competent to supply the goods in question".`, 22, ypos)
        doc.addPage();
        ypos = 15
    }
    else {
        doc.text(`"It is certified that we the undersigned purchase committee members are jointly and individually satisfied that the`, 22, ypos)
        ypos += 5
        doc.text(`recommended items are of requisite specifications and quality, prices are according to the prevailing market rates and`, 22, ypos)
        ypos += 5
        doc.text(`the supplier recommended is reliable and competent to supply the goods in question".`, 22, ypos)
        ypos += 5
    }
    doc.setFont("times", 'bold')
    doc.text("Recommended Mode of Payment:", 21, ypos, { align: 'left' })
    doc.setFont("times", 'normal')
    
    ypos += 13
    doc.setFont("times", 'bold')
    doc.text("Delivery Period:", 21, ypos, { align: 'left' })
    doc.setFont("times", 'normal')
    doc.setFont("times", 'bold')
    doc.text("Signature of the Indenter", pageWidth - 51, ypos, { align: 'left' })
    ypos += 17
    doc.text("(Member)", 21, ypos)
    doc.text("(Member)", pageWidth / 2, ypos)
    doc.text("(Member)", pageWidth - 30, ypos)
    ypos += 15
    doc.text("HOD/PI (for external projects only)", 21, ypos, { align: 'left' })
    
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
    
    doc.text('lol', 80, ypos + 4)
    doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
    doc.line(75, ypos, 75, ypos + 40)
    ypos += 5
    doc.text("Budget Available", 21, ypos + 4)
    doc.setFont('times', 'normal')
    
    doc.text('lol', 80, ypos + 4)
    doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
    ypos += 5
    doc.text("Budget Booked", 21, ypos + 4)
    doc.setFont('times', 'normal')
    
    doc.text('lol', 80, ypos + 4)
    doc.line(19, ypos + 5, pageWidth - 19, ypos + 5)
    doc.line(130, ypos, 130, ypos + 5)
    doc.line(153, ypos, 153, ypos + 5)
    doc.text("Budget Head", 132, ypos + 4)
    doc.setFont('times', 'normal')
    doc.setFontSize(8)
    
    doc.text('lol', 155, ypos + 4)
    doc.setFontSize(10)
    ypos += 5
    doc.text("Balance Budget", 21, ypos + 4)
    doc.setFont('times', 'normal')
    
    doc.text('lol', 80, ypos + 4)
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
    
    doc.save("SP102.pdf")
}

export default PDFsp102