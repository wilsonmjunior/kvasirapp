import { useEffect, useState } from 'react';
import { Alert, View, Text, ScrollView, RefreshControl } from 'react-native';

import { Link, getHomeLinks } from '../../data/services';
import { styles } from './styles';
import { Loading } from '../../components/Loading';
import { THEME } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Home() {
  const [loading, setLoading] = useState(false);
  const [homeLinks, setHomeLinks] = useState<Link[]>();

  async function loadHomes() {
    try {
      setLoading(true);
      const response = await getHomeLinks();
      console.warn('response:: ', response);
      setHomeLinks(response.links);
    } catch (error) {
      console.log('error: ', error);
      Alert.alert('Erro ao carregar links')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHomes();
  }, [])
  
  return (
    <SafeAreaView
      style={{ 
        flex: 1,
        backgroundColor: THEME.COLORS.GREY_800,
      }}
    >
      <ScrollView 
        contentContainerStyle={{ 
          flex: 1,
          backgroundColor: THEME.COLORS.GREY_800,
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadHomes} />
        }
      >
        { loading && <Loading /> }

        { homeLinks?.map((home, index) => (
          <View key={index}>
            <Text style={{ color: THEME.COLORS.WHITE }}>{home.descricao}</Text>
            <Text style={{ color: THEME.COLORS.WHITE }}>{home.link}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}