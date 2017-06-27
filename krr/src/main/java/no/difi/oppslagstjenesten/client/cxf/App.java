package no.difi.oppslagstjenesten.client.cxf;

import no.difi.begrep.Kontaktinformasjon;
import no.difi.kontaktinfo.wsdl.oppslagstjeneste_16_02.Oppslagstjeneste1602;
import no.difi.kontaktinfo.xsd.oppslagstjeneste._16_02.HentPersonerForespoersel;
import no.difi.kontaktinfo.xsd.oppslagstjeneste._16_02.HentPersonerRespons;
import no.difi.kontaktinfo.xsd.oppslagstjeneste._16_02.Informasjonsbehov;
import no.difi.kontaktinfo.xsd.oppslagstjeneste._16_02.Oppslagstjenesten;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;

import static spark.Spark.get;
import static spark.Spark.setPort;

public class App {

    private static Oppslagstjeneste1602 oppslagstjeneste;

    public static void main(String[] args) {
        oppslagstjeneste = getOppslagstjenestePort(System.getenv("SOAP_ENDPOINT"), true);

        setPort(Integer.parseInt(System.getenv("PORT")));
        get("/krr/update", (req, res) -> fetchPersons(req.queryParams("ssn")));
    }

    private static String fetchPersons(String ssn) {
        Oppslagstjenesten ot = new Oppslagstjenesten();
        ot.setPaaVegneAv(System.getenv("ON_BEHALF_OF_ID"));

        HentPersonerForespoersel personas = new HentPersonerForespoersel();
        personas.getInformasjonsbehov().add(Informasjonsbehov.KONTAKTINFO);
        personas.getPersonidentifikator().add(ssn);
        HentPersonerRespons personasResponse = oppslagstjeneste.hentPersoner(personas, ot);
        Kontaktinformasjon contactInfo = personasResponse.getPerson().get(0).getKontaktinformasjon();
        String phone = contactInfo.getMobiltelefonnummer().getValue();
        String email = contactInfo.getEpostadresse().getValue();

        return "{\"phone\":\"" + phone + "\", \"email\":\"" + email + "\"}";
    }

    private static Oppslagstjeneste1602 getOppslagstjenestePort(String serviceAddress, boolean usePaaVegneAv ) {
        JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
        jaxWsProxyFactoryBean.setServiceClass(Oppslagstjeneste1602.class);
        jaxWsProxyFactoryBean.setAddress(serviceAddress);
        jaxWsProxyFactoryBean.setBindingId("http://www.w3.org/2003/05/soap/bindings/HTTP/");
        WSS4JInterceptorHelper.addWSS4JInterceptors(jaxWsProxyFactoryBean, usePaaVegneAv);

        return (Oppslagstjeneste1602) jaxWsProxyFactoryBean.create();
    }

}
