import { ActivityIndicator, StyleSheet, Text, View, Image, Button } from 'react-native'
import XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ExcelExportBtn = ({data, title}) => {
    const exportToExcel = async () => {
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, title);

        const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + `${title}.xlsx`;

        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64
        });
        
        await Sharing.shareAsync(uri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: `dados do ${title}`,
          UTI: 'com.microsoft.excel.xlsx'
        });
    }

    return(
        <View className='h-12 w-44 mt-5 mb-5 items-center justify-center'>
            <Button 
                onPress={exportToExcel} 
                title='Exportar para excel' 
            />
        </View>
    )
}

export default ExcelExportBtn